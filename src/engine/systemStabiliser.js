import worldState from "../engine/worldState"

/**
 * 🧠 SYSTEM STABILISER
 * Final control gate for all EchoWorld subsystems
 */

export function runSystemStabiliser() {
  if (!worldState.systemStability) {
    worldState.systemStability = {
      score: 1,
      alerts: [],
    }
  }

  const sys = worldState.systemStability

  const consciousness = worldState.teachingConsciousness
  const identity = worldState.teachingIdentity
  const memory = worldState.unifiedMemory

  let instability = 0

  // 🧠 DETECT SYSTEM BREAKDOWN CONDITIONS
  if (consciousness?.coherence < 0.4) instability += 0.3
  if (identity?.stability < 0.4) instability += 0.2
  if (memory?.coherenceScore < 0.4) instability += 0.2

  if (instability > 0.5) {
    sys.alerts.push({
      type: "system_instability",
      severity: instability,
      timestamp: new Date().toISOString(),
    })
  }

  // 🧠 STABILISE SCORE
  const stability = 1 - instability

  sys.score = sys.score * 0.85 + stability * 0.15
  sys.score = Math.max(0, Math.min(1, sys.score))

  worldState.logEvent("system_stabiliser_tick", {
    score: sys.score,
  })

  return sys
}

export function getSystemStability() {
  return worldState.systemStability || null
}