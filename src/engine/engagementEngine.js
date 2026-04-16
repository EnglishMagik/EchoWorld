import { worldState } from "./worldState"

/**
 * 📊 ENGAGEMENT ENGINE
 */

export function updateEngagementModel(userText) {
  if (!worldState.engagement) {
    worldState.engagement = {
      level: 0,
      trend: "stable",
    }
  }

  const eng = worldState.engagement

  const length = userText.split(" ").length

  if (length > 12) eng.level += 1
  if (length < 4) eng.level -= 1

  eng.level = Math.max(-10, Math.min(10, eng.level))

  eng.trend =
    eng.level > 3 ? "high" :
    eng.level < -3 ? "low" :
    "stable"

  worldState.logEvent("engagement_update", eng)

  return eng
}