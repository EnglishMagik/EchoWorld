import worldState from "../engine/worldState"

/**
 * 🎭 SCENARIO GENERATOR
 * Creates dynamic situations inside scenes
 */

export function generateScenario() {
  if (!worldState.scenarioSystem) {
    worldState.scenarioSystem = {
      current: null,
      history: [],
    }
  }

  const system = worldState.scenarioSystem

  const scene = worldState.currentScene
  const phase = worldState.learningPhase
  const emotion = worldState.relationship?.dominantEmotion

  let scenario = {
    title: "Simple Conversation",
    description: "You are having a basic conversation.",
    goal: "Respond with a short sentence.",
  }

  // 🧠 SCENE-BASED SCENARIOS
  if (scene === "safe_room") {
    scenario = {
      title: "Friendly Greeting",
      description: "You meet someone for the first time.",
      goal: "Say hello and introduce yourself.",
    }
  }

  if (scene === "guided_conversation") {
    scenario = {
      title: "Daily Routine",
      description: "Talk about your day.",
      goal: "Describe what you did today.",
    }
  }

  if (scene === "real_world_sim") {
    scenario = {
      title: "Ordering Coffee",
      description: "You are at a café ordering a drink.",
      goal: "Order politely and clearly.",
    }
  }

  if (scene === "open_world") {
    scenario = {
      title: "Open Discussion",
      description: "Talk freely about any topic.",
      goal: "Express ideas clearly and confidently.",
    }
  }

  if (scene === "calm_support_space") {
    scenario = {
      title: "Gentle Practice",
      description: "A calm, guided speaking exercise.",
      goal: "Say a simple sentence with confidence.",
    }
  }

  // ❤️ EMOTION ADJUSTMENT
  if (emotion === "frustrated") {
    scenario.goal = "Speak slowly and comfortably. No pressure."
  }

  // 📚 PHASE ADJUSTMENT
  if (phase === "advanced") {
    scenario.goal += " Add detail and complexity."
  }

  system.current = scenario

  system.history.push({
    ...scenario,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("scenario_generated", scenario)

  return scenario
}

export function getScenario() {
  return worldState.scenarioSystem?.current || null
}