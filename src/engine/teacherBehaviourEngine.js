import worldState from "../engine/worldState"

/**
 * 🧠 AUTONOMOUS TEACHER BEHAVIOUR ENGINE
 * Dynamically controls HOW AI should teach per interaction
 */

export function getTeachingBehaviour(userText) {
  const profile = worldState.getLearnerProfile()
  const prediction = worldState.teachingMetrics?.lastSignal || "neutral"
  const adaptive = worldState.getAdaptiveState()

  let behaviour = {
    tone: "neutral",
    complexity: "normal",
    pacing: "medium",
    correctionStyle: "gentle",
  }

  // 🧠 CONFUSED USER → SUPPORT MODE
  if (prediction === "confused" || adaptive.level === "support") {
    behaviour = {
      tone: "calm",
      complexity: "simple",
      pacing: "slow",
      correctionStyle: "gentle",
    }
  }

  // 🚀 ENGAGED USER → CHALLENGE MODE
  if (prediction === "engaged" || adaptive.level === "challenge") {
    behaviour = {
      tone: "energetic",
      complexity: "advanced",
      pacing: "fast",
      correctionStyle: "direct",
    }
  }

  // 📚 BEGINNER PROFILE OVERRIDE
  if (profile.totalInteractions < 5) {
    behaviour.complexity = "very_simple"
    behaviour.pacing = "slow"
  }

  worldState.logEvent("teacher_behaviour_update", behaviour)

  return behaviour
}