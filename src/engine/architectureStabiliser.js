import { worldState } from "./worldState"

/**
 * 🧠 ARCHITECTURE STABILISER
 * Prevents system drift, duplication, and conflicting updates
 */

export function runArchitectureStabiliser() {
  if (!worldState.architecture) {
    worldState.architecture = {
      warnings: [],
      health: 1,
      lastFix: null,
    }
  }

  const arch = worldState.architecture

  const warnings = []

  // 🧠 DETECT SYSTEM CONFLICTS
  if (worldState.teachingConsciousness?.coherence < 0.3) {
    warnings.push("Low consciousness coherence")
  }

  if (worldState.unifiedMemory?.coherenceScore < 0.3) {
    warnings.push("Memory fragmentation detected")
  }

  if (worldState.teachingIdentity?.stability < 0.3) {
    warnings.push("Identity instability detected")
  }

  if (!worldState.teachingAutonomy) {
    warnings.push("Missing autonomy system")
  }

  // 🧠 DETECT ENGINE OVERLOAD
  const engineCount = [
    worldState.teachingIdentity,
    worldState.unifiedMemory,
    worldState.teachingConsciousness,
    worldState.realtimeLoop,
    worldState.systemAudit,
  ].filter(Boolean).length

  if (engineCount > 5) {
    warnings.push("High engine density (risk of conflict)")
  }

  // 🧠 HEALTH SCORE
  const health = Math.max(0, 1 - warnings.length * 0.15)

  arch.health = arch.health * 0.8 + health * 0.2
  arch.warnings = warnings

  worldState.logEvent("architecture_stabiliser_tick", {
    health: arch.health,
    warnings,
  })

  return arch
}