import { worldState } from "./worldState"

/**
 * 🌍 SCENE EVOLUTION ENGINE
 * Dynamically evolves the learning environment
 */

export function evolveScene() {
  if (!worldState.sceneEvolution) {
    worldState.sceneEvolution = {
      history: [],
      complexity: 1,
    }
  }

  const evo = worldState.sceneEvolution

  const phase = worldState.learningPhase
  const emotion = worldState.relationship?.dominantEmotion
  const engagement = worldState.engagement?.trend

  let scene = "conversation_room"

  // 🧠 PHASE-BASED SCENES
  if (phase === "beginner") scene = "safe_room"
  if (phase === "developing") scene = "guided_conversation"
  if (phase === "intermediate") scene = "real_world_sim"
  if (phase === "advanced") scene = "open_world"

  // ❤️ EMOTION ADJUSTMENT
  if (emotion === "frustrated") {
    scene = "calm_support_space"
  }

  // ⚡ ENGAGEMENT BOOST
  if (engagement === "high") {
    evo.complexity += 1
  }

  if (engagement === "low") {
    evo.complexity = Math.max(1, evo.complexity - 1)
  }

  worldState.currentScene = scene

  evo.history.push({
    scene,
    complexity: evo.complexity,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("scene_evolved", { scene })

  return {
    scene,
    complexity: evo.complexity,
  }
}

export function getSceneEvolution() {
  return worldState.sceneEvolution || null
}