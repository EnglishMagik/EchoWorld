import worldState from "../engine/worldState"

/**
 * 🧠 META-COGNITIVE TEACHER ENGINE
 * Tracks reasoning behind teaching decisions
 */

export function runMetaCognitiveLayer(context = {}) {
  if (!worldState.metaCognition) {
    worldState.metaCognition = {
      thoughts: [],
      reasoningPatterns: {},
      awarenessScore: 0.5,
    }
  }

  const meta = worldState.metaCognition

  const {
    teachingMode,
    emotion,
    engagement,
    trust,
    nextTeachingFocus,
  } = context

  // 🧠 BUILD REASONING TRACE
  const reasoning = {
    mode: teachingMode,
    emotion,
    engagement: engagement?.trend,
    trust: trust?.trend,
    focus: nextTeachingFocus,
  }

  // 🧠 SIMPLE SELF-AWARENESS SCORE
  let awareness = 0.5

  if (engagement?.trend === "high") awareness += 0.1
  if (trust?.trend === "high") awareness += 0.1
  if (emotion === "confident") awareness += 0.1

  if (engagement?.trend === "low") awareness -= 0.1
  if (trust?.trend === "low") awareness -= 0.1

  awareness = Math.max(0, Math.min(1, awareness))

  meta.awarenessScore =
    meta.awarenessScore * 0.85 + awareness * 0.15

  // 🧠 DETECT SIMPLE CONTRADICTIONS
  let contradiction = null

  if (teachingMode === "challenger" && trust?.trend === "low") {
    contradiction = "High challenge with low trust may reduce learning effectiveness"
  }

  if (teachingMode === "companion" && engagement?.trend === "high") {
    contradiction = "System under-challenging an engaged learner"
  }

  // 🧠 STORE THOUGHT TRACE
  meta.thoughts.push({
    reasoning,
    awareness: meta.awarenessScore,
    contradiction,
    timestamp: new Date().toISOString(),
  })

  // 🧠 PATTERN TRACKING
  const key = `${teachingMode}-${emotion}`

  if (!meta.reasoningPatterns[key]) {
    meta.reasoningPatterns[key] = {
      count: 0,
      successSignals: 0,
    }
  }

  meta.reasoningPatterns[key].count += 1

  worldState.logEvent("meta_cognition_update", {
    reasoning,
    contradiction,
  })

  return {
    awarenessScore: meta.awarenessScore,
    contradiction,
  }
}

export function getMetaCognition() {
  return worldState.metaCognition || null
}