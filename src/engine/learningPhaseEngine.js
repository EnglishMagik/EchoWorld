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