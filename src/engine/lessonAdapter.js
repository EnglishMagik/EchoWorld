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