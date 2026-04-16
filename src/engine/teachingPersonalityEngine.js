import worldState from "../engine/worldState"

/**
 * 🧠 TEACHING PERSONALITY ENGINE
 * Builds a stable but adaptive teaching identity
 */

export function updateTeachingPersonality() {
  if (!worldState.teachingPersonality) {
    worldState.teachingPersonality = {
      coreTone: "calm",
      style: "supportive",
      adaptability: 0.5,
      consistencyScore: 0,
      evolutionHistory: [],
    }
  }

  const personality = worldState.teachingPersonality
  const memory = worldState.teachingMemory
  const metrics = worldState.teachingMetrics

  if (!memory || !metrics) return personality

  // 🧠 DETERMINE DOMINANT SUCCESS PATTERN
  const strongSignals = memory.strongSignals || []

  let newTone = personality.coreTone
  let newStyle = personality.style

  strongSignals.forEach((signal) => {
    if (signal.includes("success-calm")) {
      newTone = "calm"
      newStyle = "supportive"
    }

    if (signal.includes("success-energetic")) {
      newTone = "energetic"
      newStyle = "challenging"
    }

    if (signal.includes("success-neutral")) {
      newTone = "neutral"
      newStyle = "balanced"
    }
  })

  // 🧠 UPDATE CONSISTENCY
  personality.consistencyScore =
    (personality.consistencyScore + metrics.averageClarity) / 2

  // 🧠 ADAPTABILITY (how much it shifts behaviour)
  if (metrics.lastSignal === "confused") {
    personality.adaptability += 0.05
  }

  if (metrics.lastSignal === "engaged") {
    personality.adaptability -= 0.02
  }

  // Clamp adaptability
  personality.adaptability = Math.max(0, Math.min(1, personality.adaptability))

  // 🧠 APPLY NEW PERSONALITY
  personality.coreTone = newTone
  personality.style = newStyle

  personality.evolutionHistory.push({
    tone: newTone,
    style: newStyle,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("teaching_personality_update", personality)

  return personality
}

export function getTeachingPersonality() {
  return worldState.teachingPersonality || null
}