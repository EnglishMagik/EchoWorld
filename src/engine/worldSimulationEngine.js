import worldState from "../engine/worldState"

/**
 * 🌍 WORLD SIMULATION ENGINE
 * Builds rich environments from scene types
 */

export function buildWorldState() {
  if (!worldState.simulation) {
    worldState.simulation = {
      environment: null,
      difficulty: 1,
      supportLevel: "high",
    }
  }

  const sim = worldState.simulation

  const scene = worldState.currentScene
  const phase = worldState.learningPhase
  const emotion = worldState.relationship?.dominantEmotion

  let environment = {
    name: scene,
    description: "",
    difficulty: 1,
    supportLevel: "high",
  }

  // 🧠 SCENE DEFINITIONS
  switch (scene) {
    case "safe_room":
      environment.description =
        "A calm, pressure-free space for simple practice"
      environment.difficulty = 1
      environment.supportLevel = "high"
      break

    case "guided_conversation":
      environment.description =
        "A structured conversation with hints and guidance"
      environment.difficulty = 2
      environment.supportLevel = "medium"
      break

    case "real_world_sim":
      environment.description =
        "A realistic situation requiring natural responses"
      environment.difficulty = 3
      environment.supportLevel = "low"
      break

    case "open_world":
      environment.description =
        "A free-flowing conversation with no constraints"
      environment.difficulty = 4
      environment.supportLevel = "minimal"
      break

    case "calm_support_space":
      environment.description =
        "A supportive environment to rebuild confidence"
      environment.difficulty = 1
      environment.supportLevel = "very_high"
      break

    default:
      environment.description = "A general learning environment"
  }

  // ❤️ EMOTIONAL OVERRIDE
  if (emotion === "frustrated") {
    environment.supportLevel = "very_high"
    environment.difficulty = 1
  }

  // 📚 PHASE ADJUSTMENT
  if (phase === "advanced") {
    environment.difficulty += 1
  }

  sim.environment = environment
  sim.difficulty = environment.difficulty
  sim.supportLevel = environment.supportLevel

  worldState.logEvent("world_built", environment)

  return sim
}

export function getWorldSimulation() {
  return worldState.simulation || null
}