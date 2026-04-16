import { worldState } from "./worldState"

/**
 * 🧠 SYSTEM INTEGRATION AUDIT LAYER
 * Ensures all subsystems remain healthy and connected
 */

export function runSystemAudit() {
  if (!worldState.systemAudit) {
    worldState.systemAudit = {
      issues: [],
      healthScore: 1,
    }
  }

  const audit = worldState.systemAudit

  const checks = []

  // 🧠 CHECK CORE SYSTEMS
  if (!worldState.unifiedMemory) checks.push("Missing unifiedMemory")
  if (!worldState.teachingIdentity) checks.push("Missing teachingIdentity")
  if (!worldState.teachingConsciousness)
    checks.push("Missing teachingConsciousness")

  if (!worldState.teachingAutonomy)
    checks.push("Missing autonomy system")

  if (worldState.unifiedMemory?.coherenceScore < 0.4)
    checks.push("Low memory coherence")

  if (worldState.teachingIdentity?.stability < 0.4)
    checks.push("Low identity stability")

  // 🧠 UPDATE HEALTH SCORE
  const health = Math.max(0, 1 - checks.length * 0.15)

  audit.healthScore = audit.healthScore * 0.8 + health * 0.2

  audit.issues = checks

  worldState.logEvent("system_audit", {
    healthScore: audit.healthScore,
    issues: checks,
  })

  return audit
}