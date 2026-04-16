import worldState from "../engine/worldState"

/**
 * 📜 TEACHING CONSTITUTION SYSTEM
 * Defines core rules governing EchoWorld behaviour
 */

export function evaluateTeachingConstitution(context = {}) {
  if (!worldState.teachingConstitution) {
    worldState.teachingConstitution = {
      principles: [
        "Always support learner understanding before increasing difficulty",
        "Never punish confusion",
        "Adapt pace to learner emotional state",
        "Prioritise clarity over complexity",
        "Encourage progress, not perfection",
      ],
      violations: [],
      stabilityScore: 1,
    }
  }

  const constitution = worldState.teachingConstitution

  const { emotion, engagement, trust, teachingMode, scenario } = context

  let violations = []

  // 🧠 RULE 1: DO NOT OVER-CHALLENGE LOW TRUST
  if (trust?.trend === "low" && teachingMode === "challenger") {
    violations.push("Over-challenging low-trust learner")
  }

  // 🧠 RULE 2: DO NOT IGNORE CONFUSION
  if (emotion === "confused" && engagement?.trend === "low") {
    violations.push("Ignoring learner confusion signals")
  }

  // 🧠 RULE 3: DO NOT ESCALATE DIFFICULTY TOO FAST
  if (scenario?.difficulty > 3 && trust?.trend !== "high") {
    violations.push("Premature difficulty escalation")
  }

  // 🧠 UPDATE STABILITY SCORE
  const violationPenalty = violations.length * 0.15

  constitution.stabilityScore = Math.max(
    0,
    constitution.stabilityScore - violationPenalty
  )

  // 🧠 LOG VIOLATIONS
  if (violations.length > 0) {
    constitution.violations.push({
      violations,
      context,
      timestamp: new Date().toISOString(),
    })

    worldState.logEvent("teaching_constitution_violation", {
      violations,
    })
  }

  return {
    violations,
    stabilityScore: constitution.stabilityScore,
  }
}

export function getTeachingConstitution() {
  return worldState.teachingConstitution || null
}