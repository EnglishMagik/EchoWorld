import worldState from "../engine/worldState"

/**
 * 🧠 MULTI-MODE TEACHING ENGINE
 * Switches teaching modes based on learner state
 */

export function determineTeachingMode(userText) {
  if (!worldState.teachingModeSystem) {
    worldState.teachingModeSystem = {
      currentMode: "coach",
      modeHistory: [],
    }
  }

  const system = worldState.teachingModeSystem

  const metrics = worldState.teachingMetrics
  const personality = worldState.teachingPersonality
  const prediction = worldState.teachingMetrics?.lastSignal || "neutral"

  let mode = "coach"

  // 🧠 CONFUSED → SUPPORTIVE MODES
  if (prediction === "confused") {
    mode = "companion"
  }

  // 🚀 ENGAGED → PUSH HARDER
  if (prediction === "engaged") {
    mode = "challenger"
  }

  // 📚 LOW EXPERIENCE → STORY MODE
  const profile = worldState.getLearnerProfile()
  if (profile.totalInteractions < 5) {
    mode = "storyteller"
  }

  // 🧪 HIGH LEVEL → TESTING MODE
  if (profile.avgWordCount > 15 && metrics.averageClarity > 0.7) {
    mode = "examiner"
  }

  // 🧠 PERSONALITY INFLUENCE
  if (personality?.style === "challenging") {
    mode = "challenger"
  }

  if (personality?.style === "supportive" && prediction !== "engaged") {
    mode = "coach"
  }

  system.currentMode = mode

  system.modeHistory.push({
    mode,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("teaching_mode_switch", { mode })

  return mode
}

export function getTeachingMode() {
  return worldState.teachingModeSystem?.currentMode || "coach"
}