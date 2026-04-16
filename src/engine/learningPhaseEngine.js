import { worldState } from "./worldState"

/**
 * 📚 LEARNING PHASE ENGINE
 */

export function updateLearningPhase() {
  if (!worldState.learningPhase) {
    worldState.learningPhase = "beginner"
  }

  const profile = worldState.getLearnerProfile()

  let phase = "beginner"

  if (profile.avgWordCount > 6) phase = "developing"
  if (profile.avgWordCount > 12) phase = "intermediate"
  if (profile.avgWordCount > 20) phase = "advanced"

  worldState.learningPhase = phase

  worldState.logEvent("learning_phase_update", { phase })

  return phase
}