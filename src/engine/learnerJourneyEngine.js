import { worldState } from "./worldState"

/**
 * 🧭 LEARNER JOURNEY ENGINE
 * Tracks long-term growth
 */

export function updateLearnerJourney() {
  if (!worldState.journey) {
    worldState.journey = {
      sessions: 0,
      milestones: [],
      growthScore: 0,
    }
  }

  const journey = worldState.journey

  journey.sessions += 1

  const profile = worldState.getLearnerProfile()

  journey.growthScore =
    (profile.avgWordCount + worldState.user.level) / 2

  if (journey.growthScore > 10 && journey.milestones.length < 1) {
    journey.milestones.push("Early Progress")
  }

  if (journey.growthScore > 20 && journey.milestones.length < 2) {
    journey.milestones.push("Confident Speaker")
  }

  worldState.logEvent("journey_update", journey)

  return journey
}