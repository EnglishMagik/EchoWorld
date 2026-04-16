import worldState from "../engine/worldState"

/**
 * 🧠 SELF-IMPROVING PROMPT ENGINE
 * Evolves how EchoWorld communicates with the AI model
 */

export function buildAdaptivePrompt(userText) {
  if (!worldState.promptEvolution) {
    worldState.promptEvolution = {
      totalPrompts: 0,
      successPatterns: {},
      bestPromptStyle: "balanced",
    }
  }

  const promptEngine = worldState.promptEvolution
  const metrics = worldState.teachingMetrics
  const behaviour = worldState.teacherBehaviour || {}

  promptEngine.totalPrompts += 1

  // 🧠 BASE PROMPT STRUCTURE
  let prompt = {
    tone: "neutral",
    complexity: "medium",
    verbosity: "standard",
    correctionStyle: "gentle",
  }

  // 📉 CONFUSED LEARNER
  if (metrics?.lastSignal === "confused") {
    prompt.tone = "calm"
    prompt.complexity = "simple"
    prompt.verbosity = "low"
  }

  // 🚀 ENGAGED LEARNER
  if (metrics?.lastSignal === "engaged") {
    prompt.tone = "energetic"
    prompt.complexity = "advanced"
    prompt.verbosity = "detailed"
  }

  // 🧠 BEHAVIOUR OVERRIDE (STEP 55)
  if (behaviour.tone) {
    prompt.tone = behaviour.tone
    prompt.complexity = behaviour.complexity
  }

  // 📊 LEARN FROM SUCCESS PATTERNS
  const key = `${prompt.tone}-${prompt.complexity}`

  if (!promptEngine.successPatterns[key]) {
    promptEngine.successPatterns[key] = {
      used: 0,
      success: 0,
    }
  }

  promptEngine.successPatterns[key].used += 1

  if (metrics?.averageClarity > 0.6) {
    promptEngine.successPatterns[key].success += 1
  }

  // 🧠 UPDATE BEST PROMPT STYLE
  promptEngine.bestPromptStyle = Object.entries(
    promptEngine.successPatterns
  )
    .map(([style, data]) => ({
      style,
      score: data.success / data.used,
    }))
    .sort((a, b) => b.score - a.score)[0]?.style || "balanced"

  worldState.logEvent("prompt_evolution", {
    prompt,
    bestStyle: promptEngine.bestPromptStyle,
  })

  return prompt
}

export function getPromptEvolutionState() {
  return worldState.promptEvolution || null
}