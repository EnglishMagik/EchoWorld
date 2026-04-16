import { worldState } from "./worldState"

/**
 * 🧬 LESSON ADAPTATION ENGINE
 * Dynamically modifies lesson difficulty in real time
 */

export function adaptLesson(currentLesson) {
  const profile = worldState.getLearnerProfile()
  const adaptive = worldState.getAdaptiveState()

  if (!currentLesson) return currentLesson

  let modifiedLesson = currentLesson

  // 🟢 SUPPORT MODE — simplify language
  if (adaptive.level === "support") {
    modifiedLesson += `

🟢 ADAPTATION:
- Simplify vocabulary
- Add more examples
- Reduce task difficulty
`
  }

  // 🟡 NORMAL MODE — balanced learning
  if (adaptive.level === "normal") {
    modifiedLesson += `

🟡 ADAPTATION:
- Maintain balanced difficulty
- Encourage natural responses
`
  }

  // 🔴 CHALLENGE MODE — increase complexity
  if (adaptive.level === "challenge") {
    modifiedLesson += `

🔴 ADAPTATION:
- Increase vocabulary complexity
- Add follow-up questions
- Push longer responses
`
  }

  // 🧠 PROFILE-BASED ADAPTATION
  if (profile.avgWordCount < 6) {
    modifiedLesson += `

💡 NOTE:
Learner prefers short responses → keep instructions simple
`
  }

  if (profile.avgWordCount > 12) {
    modifiedLesson += `

💡 NOTE:
Learner produces long responses → introduce deeper tasks
`
  }

  return modifiedLesson
}