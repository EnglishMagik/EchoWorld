import worldState from "../engine/worldState"

/**
 * 🎭 SCENARIO PROGRESSION ENGINE
 * Turns scenarios into multi-step experiences
 */

export function updateScenarioProgression(userText, aiResponse) {
  if (!worldState.scenarioProgressionSystem) {
    worldState.scenarioProgressionSystem = {
      step: 0,
      history: [],
      completed: false,
    }
  }

  const system = worldState.scenarioProgressionSystem

  const scenario = worldState.scenarioSystem?.current
  if (!scenario) return system

  system.step += 1

  // 🧠 BASIC PROGRESSION RULES
  let stageDescription = "starting interaction"

  if (system.step === 1) {
    stageDescription = "initial response"
  }

  if (system.step === 2) {
    stageDescription = "clarification phase"
  }

  if (system.step === 3) {
    stageDescription = "challenge introduced"
  }

  if (system.step >= 4) {
    stageDescription = "resolution phase"
  }

  // 🧠 COMPLETION CONDITION
  if (system.step >= 5) {
    system.completed = true
  }

  // 🧠 SCENARIO EVOLUTION
  if (scenario.title === "Ordering Coffee") {
    if (system.step === 1) scenario.goal = "Greet the barista"
    if (system.step === 2) scenario.goal = "Place your order"
    if (system.step === 3) scenario.goal = "Respond to a follow-up question"
    if (system.step === 4) scenario.goal = "Confirm your order"
  }

  if (scenario.title === "Daily Routine") {
    if (system.step === 1) scenario.goal = "Describe your morning"
    if (system.step === 2) scenario.goal = "Add details about your activities"
    if (system.step === 3) scenario.goal = "Explain how your day felt"
  }

  if (scenario.title === "Open Discussion") {
    if (system.step === 1) scenario.goal = "State your opinion"
    if (system.step === 2) scenario.goal = "Support your idea with reasoning"
    if (system.step === 3) scenario.goal = "Respond to a counterpoint"
  }

  // 🧠 LOG STEP HISTORY
  system.history.push({
    step: system.step,
    scenario: scenario.title,
    stage: stageDescription,
    userText,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("scenario_progression", {
    step: system.step,
    stage: stageDescription,
  })

  return system
}

export function getScenarioProgression() {
  return worldState.scenarioProgressionSystem || null
}