import worldState from "../engine/worldState"

/**
 * 🔁 SELF-IMPROVEMENT LOOP ENGINE
 * Closes the loop between teaching → outcome → adaptation
 */

export function runSelfImprovementLoop(userText, aiResponse) {
  if (!worldState.selfImprovement) {
    worldState.selfImprovement = {
      cycles: 0,
      effectivenessLog: [],
      globalScore: 0.5,
    }
  }

  const loop = worldState.selfImprovement

  const metrics = worldState.teachingMetrics
  const engagement = worldState.engagement
  const trust = worldState.trust

  loop.cycles += 1

  // 🧠 EFFECTIVENESS SCORE
  let score = 0.5

  if (metrics?.averageClarity > 0.6) score += 0.2
  if (engagement?.trend === "high") score += 0.15
  if (trust?.trend === "high") score += 0.15

  if (engagement?.trend === "low") score -= 0.2
  if (trust?.trend === "low") score -= 0.2

  score = Math.max(0, Math.min(1, score))

  // 🧠 UPDATE GLOBAL SCORE (SMOOTHED)
  loop.globalScore =
    loop.globalScore * 0.8 + score * 0.2

  // 🧠 DETERMINE SYSTEM ADJUSTMENT SIGNAL
  let adjustment = "stable"

  if (loop.globalScore > 0.75) adjustment = "increase_challenge"
  if (loop.globalScore < 0.4) adjustment = "increase_support"

  if (!worldState.teachingAdaptation) {
    worldState.teachingAdaptation = {
      mode: "balanced",
    }
  }

  worldState.teachingAdaptation.mode = adjustment

  // 🧠 LOG CYCLE
  loop.effectivenessLog.push({
    score,
    globalScore: loop.globalScore,
    adjustment,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("self_improvement_cycle", {
    score,
    adjustment,
  })

  return {
    score,
    globalScore: loop.globalScore,
    adjustment,
  }
}

export function getSelfImprovementState() {
  return worldState.selfImprovement || null
}