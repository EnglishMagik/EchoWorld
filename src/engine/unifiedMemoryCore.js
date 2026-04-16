import worldState from "../engine/worldState"

/**
 * 🧠 UNIFIED MEMORY CORE
 * Merges all memory systems into one coherent retrieval layer
 */

export function buildUnifiedMemory() {
  if (!worldState.unifiedMemory) {
    worldState.unifiedMemory = {
      snapshot: {},
      contradictions: [],
      coherenceScore: 0.5,
    }
  }

  const memory = worldState.unifiedMemory

  const learning = worldState.learningMemory
  const longTerm = worldState.longTermMemory
  const relationship = worldState.relationship
  const trust = worldState.trust
  const engagement = worldState.engagement
  const meta = worldState.metaCognition

  // 🧠 MERGE ALL MEMORY SOURCES
  const snapshot = {
    insights: learning?.insights || [],
    patterns: learning?.patterns || {},
    journey: worldState.journey || null,

    identity: worldState.teachingIdentity?.snapshot || null,

    emotionHistory: relationship?.emotionalHistory || [],
    dominantEmotion: relationship?.dominantEmotion || null,

    trustLevel: trust?.level ?? 0.5,
    engagementLevel: engagement?.level ?? 0,

    metaAwareness: meta?.awarenessScore ?? 0.5,
  }

  // 🧠 DETECT CONTRADICTIONS
  const contradictions = []

  if (trust?.level < 0.3 && engagement?.trend === "high") {
    contradictions.push("High engagement but low trust")
  }

  if (
    snapshot.metaAwareness > 0.7 &&
    snapshot.insights.length === 0
  ) {
    contradictions.push("High meta-awareness with low memory depth")
  }

  if (
    relationship?.dominantEmotion === "frustrated" &&
    trust?.level > 0.7
  ) {
    contradictions.push("Trust/emotion mismatch detected")
  }

  // 🧠 COHERENCE SCORE
  let coherence = 1 - contradictions.length * 0.2
  coherence = Math.max(0, Math.min(1, coherence))

  memory.snapshot = snapshot
  memory.contradictions = contradictions

  memory.coherenceScore =
    memory.coherenceScore * 0.8 + coherence * 0.2

  worldState.logEvent("unified_memory_update", {
    coherence,
    contradictions,
  })

  return {
    snapshot,
    coherenceScore: memory.coherenceScore,
    contradictions,
  }
}

export function getUnifiedMemory() {
  return worldState.unifiedMemory || null
}