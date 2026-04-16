import { worldState } from "./worldState"

/**
 * 🧠 TRUST ENGINE
 */

export function updateTrustModel(emotion) {
  if (!worldState.trust) {
    worldState.trust = {
      level: 0.5,
      trend: "stable",
    }
  }

  const trust = worldState.trust

  if (emotion === "confident") trust.level += 0.05
  if (emotion === "frustrated") trust.level -= 0.07
  if (emotion === "confused") trust.level -= 0.05

  trust.level = Math.max(0, Math.min(1, trust.level))

  trust.trend =
    trust.level > 0.7 ? "high" :
    trust.level < 0.3 ? "low" :
    "stable"

  worldState.logEvent("trust_update", trust)

  return trust
}