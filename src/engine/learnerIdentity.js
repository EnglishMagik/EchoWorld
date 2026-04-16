import { worldState } from "./worldState"

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