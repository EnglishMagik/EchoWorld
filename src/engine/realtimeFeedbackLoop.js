import worldState from "../engine/worldState"

/**
 * ⚡ REAL-TIME FEEDBACK LOOP
 * Updates teaching behaviour instantly during interaction
 */

export function runRealtimeFeedbackLoop(userText, aiResponse) {
  if (!worldState.realtimeLoop) {
    worldState.realtimeLoop = {
      adjustments: [],
      lastSignal: null,
      stability: 0.5,
    }
  }

  const loop = worldState.realtimeLoop

  const engagement = worldState.engagement
  const trust = worldState.trust
  const emotion = worldState.relationship?.dominantEmotion

  // 🧠 BASIC SIGNAL DETECTION
  let signal = "stable"

  if (!userText || userText.trim().length === 0) {
    signal = "disengaged"
  }

  if (userText && userText.split(" ").length < 3) {
    signal = "low_effort"
  }

  if (emotion === "confused") {
    signal = "confusion_detected"
  }

  if (trust?.trend === "low") {
    signal = "trust_drop"
  }

  if (engagement?.trend === "high") {
    signal = "high_engagement"
  }

  loop.lastSignal = signal

  // 🧠 REAL-TIME ADJUSTMENTS
  let adjustment = {
    signal,
    action: null,
  }

  switch (signal) {
    case "disengaged":
      adjustment.action = "simplify_response"
      break

    case "low_effort":
      adjustment.action = "increase_guidance"
      break

    case "confusion_detected":
      adjustment.action = "add_clarification"
      break

    case "trust_drop":
      adjustment.action = "increase_supportiveness"
      break

    case "high_engagement":
      adjustment.action = "increase_challenge"
      break

    default:
      adjustment.action = "maintain_mode"
  }

  // 🧠 UPDATE STABILITY
  let stabilityDelta = 0

  if (signal === "high_engagement") stabilityDelta += 0.1
  if (signal === "confusion_detected") stabilityDelta -= 0.1
  if (signal === "trust_drop") stabilityDelta -= 0.15

  loop.stability =
    loop.stability * 0.85 + (0.5 + stabilityDelta) * 0.15

  loop.stability = Math.max(0, Math.min(1, loop.stability))

  // 🧠 STORE ADJUSTMENT
  loop.adjustments.push({
    userText,
    signal,
    adjustment,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("realtime_feedback_update", {
    signal,
    action: adjustment.action,
  })

  return adjustment
}

export function getRealtimeLoop() {
  return worldState.realtimeLoop || null
}