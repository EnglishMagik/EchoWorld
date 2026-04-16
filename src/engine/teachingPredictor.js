import worldState from "../engine/worldState"

/**
 * 🧠 PREDICTIVE TEACHING SYSTEM
 * Estimates if learner will struggle BEFORE AI responds
 */

export function predictLearningOutcome(userText) {
  const profile = worldState.getLearnerProfile()

  let risk = 0

  const words = userText.trim().split(" ")

  // 📉 SHORT INPUT = HIGH RISK
  if (words.length < 4) risk += 2

  // 📉 LOW EXPERIENCE = HIGH RISK
  if (profile.totalInteractions < 5) risk += 2

  // 📈 LONG RESPONSES = LOW RISK
  if (words.length > 10) risk -= 1

  let prediction = "stable"

  if (risk >= 3) prediction = "confusion_risk"
  if (risk <= -1) prediction = "high_understanding"

  worldState.logEvent("teaching_prediction", {
    userText,
    risk,
    prediction,
  })

  return {
    risk,
    prediction,
  }
}