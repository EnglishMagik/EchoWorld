import { worldState } from "./worldState"

/**
 * 🧠 TEACHING MEMORY CONSOLIDATION ENGINE
 * Converts reflections into long-term teaching instincts
 */

export function consolidateTeachingMemory() {
  if (!worldState.teachingMemory) {
    worldState.teachingMemory = {
      stablePatterns: {},
      strongSignals: [],
      totalConsolidations: 0,
    }
  }

  const memory = worldState.teachingMemory
  const reflection = worldState.selfReflection

  if (!reflection || !reflection.insights.length) return memory

  memory.totalConsolidations += 1

  // 🧠 PROCESS RECENT INSIGHTS
  reflection.insights.forEach((insight) => {
    const key = `${insight.outcome}-${insight.behaviourUsed?.tone || "neutral"}`

    if (!memory.stablePatterns[key]) {
      memory.stablePatterns[key] = {
        count: 0,
        successRate: 0,
      }
    }

    const pattern = memory.stablePatterns[key]

    pattern.count += 1

    if (insight.outcome === "success") {
      pattern.successRate =
        (pattern.successRate * (pattern.count - 1) + 1) / pattern.count
    } else {
      pattern.successRate =
        (pattern.successRate * (pattern.count - 1) + 0) / pattern.count
    }
  })

  // 🧠 IDENTIFY STRONG PATTERNS
  memory.strongSignals = Object.entries(memory.stablePatterns)
    .filter(([_, data]) => data.successRate > 0.7 && data.count > 3)
    .map(([key]) => key)

  worldState.logEvent("teaching_memory_consolidated", memory)

  return memory
}

export function getTeachingMemory() {
  return worldState.teachingMemory || null
}