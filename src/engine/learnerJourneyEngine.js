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