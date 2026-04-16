import worldState from "./worldState";

/**
 * Very simple response generator (safe fallback version)
 * Later you can replace this with AI logic.
 */
export function generateResponse(input = "") {
  // store input in timeline so system stays consistent
  if (worldState?.addSessionEvent) {
    worldState.addSessionEvent(`User: ${input}`);
  }

  // basic response logic (placeholder)
  let response = "";

  if (!input) {
    response = "I didn't receive anything.";
  } else if (input.toLowerCase().includes("hello")) {
    response = "Hello — system is running.";
  } else if (input.toLowerCase().includes("help")) {
    response = "I’m here. The system is working in basic mode.";
  } else {
    response = "Response received (placeholder mode).";
  }

  // store assistant response
  if (worldState?.addSessionEvent) {
    worldState.addSessionEvent(`Assistant: ${response}`);
  }

  return response;
}

/**
 * 🧬 LEARNING IDENTITY SYSTEM
 * Builds long-term learner personality profile
 */

export function updateLearnerIdentity() {
  const profile = worldState.getLearnerProfile()

  if (!worldState.learnerIdentity) {
    worldState.learnerIdentity = {
      type: "unknown",
      confidence: 0,
      fluencyTrend: "stable",
      personality: "neutral",
      strengths: [],
      weaknesses: [],
    }
  }

  const identity = worldState.learnerIdentity

  // 🧠 FLUENCY ANALYSIS
  if (profile.avgWordCount > 12) {
    identity.fluencyTrend = "improving"
  }

  if (profile.avgWordCount < 5) {
    identity.fluencyTrend = "emerging"
  }

  // 🎭 PERSONALITY DETECTION
  if (profile.strongResponses > profile.shortResponses) {
    identity.personality = "expressive"
  } else {
    identity.personality = "reserved"
  }

  // 💪 STRENGTHS
  if (profile.avgWordCount > 10) {
    if (!identity.strengths.includes("fluency")) {
      identity.strengths.push("fluency")
    }
  }

  // ⚠️ WEAKNESSES
  if (profile.shortResponses > profile.strongResponses) {
    if (!identity.weaknesses.includes("conciseness_overuse")) {
      identity.weaknesses.push("conciseness_overuse")
    }
  }

  // 🧠 CONFIDENCE SCORE (simple heuristic)
  identity.confidence = Math.min(
    100,
    profile.totalInteractions * 5 +
      profile.strongResponses * 10
  )

  worldState.logEvent("identity_update", identity)

  return identity
}

export function getLearnerIdentity() {
  return (
    worldState.learnerIdentity || {
      type: "unknown",
      confidence: 0,
    }
  )
}