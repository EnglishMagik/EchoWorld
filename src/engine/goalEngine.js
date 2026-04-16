import { worldState } from "./worldState"

/**
 * 🎯 GOAL ENGINE
 * Creates dynamic learner goals
 */

export function updateGoalSystem() {
  if (!worldState.goals) {
    worldState.goals = {
      current: "Speak 5 words clearly",
      progress: 0,
      completed: [],
    }
  }

  const goals = worldState.goals
  const profile = worldState.getLearnerProfile()

  // 🧠 UPDATE GOAL BASED ON LEVEL
  if (profile.avgWordCount > 5) {
    goals.current = "Form full sentences"
  }

  if (profile.avgWordCount > 12) {
    goals.current = "Express ideas clearly"
  }

  if (profile.avgWordCount > 20) {
    goals.current = "Speak fluently with confidence"
  }

  // 📊 PROGRESS
  goals.progress = Math.min(100, profile.avgWordCount * 4)

  if (goals.progress >= 100) {
    goals.completed.push(goals.current)
    goals.progress = 0
  }

  worldState.logEvent("goal_update", goals)

  return goals
}