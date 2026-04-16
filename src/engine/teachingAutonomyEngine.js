import worldState from "../engine/worldState"
/**
 * 🧠 TEACHING AUTONOMY ENGINE
 * Determines what EchoWorld should teach next proactively
 */

export function determineNextTeachingFocus() {
  if (!worldState.teachingAutonomy) {
    worldState.teachingAutonomy = {
      currentFocus: "basic_conversation",
      history: [],
      priority: "stability",
    }
  }

  const autonomy = worldState.teachingAutonomy

  const profile = worldState.getLearnerProfile()
  const memory = worldState.learningMemory
  const engagement = worldState.engagement
  const trust = worldState.trust

  let focus = "basic_conversation"

  // 🧠 LOW ENGAGEMENT → SIMPLIFY
  if (engagement?.trend === "low") {
    focus = "confidence_building"
  }

  // 🧠 LOW TRUST → SAFETY + SUPPORT
  if (trust?.trend === "low") {
    focus = "supportive_recovery"
  }

  // 🧠 HIGH ENGAGEMENT → CHALLENGE
  if (engagement?.trend === "high") {
    focus = "advanced_expression"
  }

  // 🧠 BEGINNER PHASE
  if (worldState.learningPhase === "beginner") {
    focus = "guided_conversation"
  }

  // 🧠 MEMORY-BASED INSIGHT
  if (memory?.insights?.length > 5) {
    const lastInsight = memory.insights[memory.insights.length - 1]

    if (lastInsight.keyLearning?.includes("structured")) {
      focus = "multi_step_reasoning"
    }
  }

  // 🧠 UPDATE STATE
  autonomy.currentFocus = focus

  autonomy.history.push({
    focus,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("teaching_autonomy_update", { focus })

  return focus
}

export function getTeachingAutonomy() {
  return worldState.teachingAutonomy || null
}