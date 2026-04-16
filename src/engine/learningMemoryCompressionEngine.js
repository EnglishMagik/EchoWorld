import worldState from "../engine/worldState"

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
    response = "Hello - system is running.";
  } else if (input.toLowerCase().includes("help")) {
    response = "I'm here. The system is working in basic mode.";
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
 * 🧠 LEARNING MEMORY COMPRESSION ENGINE
 * Converts scenario history into long-term knowledge
 */

export function compressLearningMemory() {
  if (!worldState.learningMemory) {
    worldState.learningMemory = {
      insights: [],
      patterns: {},
      compressedSessions: 0,
    }
  }

  const memory = worldState.learningMemory

  const scenarioSystem = worldState.scenarioSystem
  const progression = worldState.scenarioProgressionSystem

  if (!scenarioSystem?.current || !progression?.completed) {
    return memory
  }

  const scenario = scenarioSystem.current
  const history = progression.history || []

  memory.compressedSessions += 1

  // 🧠 BASIC INSIGHT GENERATION
  let insight = {
    scenario: scenario.title,
    stepsCompleted: progression.step,
    success: progression.completed,
    keyLearning: "",
  }

  // 🧠 PATTERN DETECTION
  const avgStepLength =
    history.reduce((sum, h) => sum + (h.userText?.split(" ").length || 0), 0) /
    Math.max(history.length, 1)

  if (avgStepLength > 10) {
    insight.keyLearning =
      "User performs better with structured multi-step scenarios"
  } else {
    insight.keyLearning =
      "User prefers short, simple interaction steps"
  }

  // 🧠 SCENARIO-SPECIFIC KNOWLEDGE
  if (scenario.title === "Ordering Coffee") {
    insight.keyLearning +=
      " | Real-world roleplay improves practical language usage"
  }

  if (scenario.title === "Open Discussion") {
    insight.keyLearning +=
      " | Argumentation improves when prompts escalate gradually"
  }

  if (scenario.title === "Daily Routine") {
    insight.keyLearning +=
      " | Familiar topics increase fluency and confidence"
  }

  // 🧠 STORE PATTERN
  const key = scenario.title

  if (!memory.patterns[key]) {
    memory.patterns[key] = {
      successRate: 0,
      attempts: 0,
    }
  }

  memory.patterns[key].attempts += 1

  if (progression.completed) {
    memory.patterns[key].successRate =
      (memory.patterns[key].successRate * (memory.patterns[key].attempts - 1) +
        1) /
      memory.patterns[key].attempts
  }

  memory.insights.push(insight)

  worldState.logEvent("learning_memory_compressed", insight)

  return memory
}

export function getLearningMemory() {
  return worldState.learningMemory || null
}