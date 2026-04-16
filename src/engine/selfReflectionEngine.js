import worldState from "../engine/worldState"

/**
 * 🧠 SELF-REFLECTION ENGINE
 * Explains WHY teaching worked or failed
 */

export function runSelfReflection(userText, aiResponse) {
  if (!worldState.selfReflection) {
    worldState.selfReflection = {
      totalReflections: 0,
      insights: [],
      patterns: {},
    }
  }

  const reflection = worldState.selfReflection
  const metrics = worldState.teachingMetrics
  const behaviour = worldState.teacherBehaviour || {}

  reflection.totalReflections += 1

  const wordCount = userText.trim().split(" ").length

  // 🧠 DETERMINE OUTCOME
  let outcome = "neutral"

  if (metrics?.lastSignal === "engaged") outcome = "success"
  if (metrics?.lastSignal === "confused") outcome = "failure"

  // 🧠 GENERATE EXPLANATION
  let reason = "stable interaction"

  if (outcome === "success") {
    if (wordCount > 10) {
      reason = "Learner produced longer response indicating understanding"
    } else {
      reason = "Learner showed engagement signal"
    }
  }

  if (outcome === "failure") {
    if (wordCount < 4) {
      reason = "Response too short, likely confusion"
    } else {
      reason = "Low clarity despite response"
    }
  }

  const insight = {
    outcome,
    reason,
    behaviourUsed: behaviour,
    wordCount,
    timestamp: new Date().toISOString(),
  }

  reflection.insights.push(insight)

  // 🧠 PATTERN LEARNING
  const key = `${outcome}-${behaviour.tone || "neutral"}`

  if (!reflection.patterns[key]) {
    reflection.patterns[key] = 0
  }

  reflection.patterns[key] += 1

  worldState.logEvent("self_reflection", insight)

  return insight
}

export function getSelfReflection() {
  return worldState.selfReflection || null
}