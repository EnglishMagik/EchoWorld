import worldState from "../engine/worldState"

export function buildAIContext(userText) {
  const scene = worldState.scenarios[worldState.currentScene]
  const voice = worldState.getVoice?.() || {}

  const level = worldState.user.level
  const lesson = worldState.getLessonState()

  const phaseInstruction =
    lesson.phase === "warmup"
      ? "Encourage simple speaking, low pressure"
      : lesson.phase === "practice"
      ? "Correct gently and guide structure"
      : lesson.phase === "production"
      ? "Push full sentences and fluency"

  return {
    input: userText,

    scene: {
      name: scene.name,
      intro: scene.intro,
    },

    voice,

    lesson: {
      phase: lesson.phase,
      complete: lesson.complete,
      instruction: phaseInstruction,
    },

    learnerProfile: {
      level,
    },

    history: worldState.getHistory().slice(-10),
  }
}