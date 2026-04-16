import worldState from "../engine/worldState"

/**
 * 🧠 TEACHER INSIGHTS ENGINE
 * Analyses learner behaviour and generates teaching guidance
 */

export function generateTeacherInsights() {
  const profile = worldState.getLearnerProfile()
  const adaptive = worldState.getAdaptiveState()
  const memory = worldState.getTeacherMemory()
  const topWords = worldState.getTopWords()

  const insights = []

  // 🧍 participation level
  if (profile.totalInteractions < 5) {
    insights.push("Learner is still in early engagement phase.")
  }

  // 📏 response length pattern
  if (profile.shortResponses > profile.strongResponses) {
    insights.push("Learner tends to respond briefly — may need prompting.")
  }

  if (profile.strongResponses > profile.shortResponses) {
    insights.push("Learner is producing strong, detailed responses.")
  }

  // 🧠 adaptive state insight
  if (adaptive.level === "support") {
    insights.push("System is currently in SUPPORT mode — simplify input.")
  }

  if (adaptive.level === "challenge") {
    insights.push("System is in CHALLENGE mode — increase complexity.")
  }

  // 🧾 teacher behaviour insight
  if (memory.corrections > memory.encouragements) {
    insights.push("Teaching style is correction-heavy — consider more encouragement.")
  }

  if (memory.encouragements > memory.corrections) {
    insights.push("Teaching style is encouragement-heavy — good for fluency building.")
  }

  // 📚 vocabulary insight
  if (topWords.length > 0) {
    insights.push(
      `Most used vocabulary: ${topWords.join(", ")}`
    )
  }

  return {
    insights,
    summary: {
      level: adaptive.level,
      interactions: profile.totalInteractions,
      strongestPattern:
        profile.strongResponses > profile.shortResponses
          ? "long-form speaking"
          : "short-form speaking",
    },
  }
}