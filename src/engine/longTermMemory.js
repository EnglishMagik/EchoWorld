import { worldState } from "./worldState"

/**
 * 🧠 LONG-TERM MEMORY SYSTEM
 * Stores persistent learning patterns over time
 */

export function updateLongTermMemory() {
  if (!worldState.longTermMemory) {
    worldState.longTermMemory = {
      mistakes: {},
      masteredWords: {},
      sessionsCompleted: 0,
      dominantWeakness: null,
      dominantStrength: null,
      teachingStrategy: "balanced",
    }
  }

  const memory = worldState.longTermMemory
  const profile = worldState.getLearnerProfile()

  // 📊 SESSION COUNT
  memory.sessionsCompleted += 1

  // 📉 TRACK REPEATED SHORT RESPONSES
  if (profile.shortResponses > profile.strongResponses) {
    memory.mistakes["short_responses"] =
      (memory.mistakes["short_responses"] || 0) + 1
  }

  // 📈 TRACK FLUENCY GROWTH
  if (profile.avgWordCount > 10) {
    memory.masteredWords["fluency"] =
      (memory.masteredWords["fluency"] || 0) + 1
  }

  // 🧠 DETERMINE DOMINANT WEAKNESS
  const sortedMistakes = Object.entries(memory.mistakes).sort(
    (a, b) => b[1] - a[1]
  )

  memory.dominantWeakness =
    sortedMistakes[0]?.[0] || null

  // 💪 DETERMINE DOMINANT STRENGTH
  const sortedStrengths = Object.entries(memory.masteredWords).sort(
    (a, b) => b[1] - a[1]
  )

  memory.dominantStrength =
    sortedStrengths[0]?.[0] || null

  // 🎯 TEACHING STRATEGY EVOLUTION

  if (memory.dominantWeakness === "short_responses") {
    memory.teachingStrategy = "expansion_focus"
  }

  if (profile.avgWordCount > 12) {
    memory.teachingStrategy = "advanced_fluency"
  }

  if (memory.sessionsCompleted < 3) {
    memory.teachingStrategy = "foundation_building"
  }

  worldState.logEvent("long_term_memory_update", memory)

  return memory
}

export function getLongTermMemory() {
  return worldState.longTermMemory || null
}