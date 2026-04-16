import worldState from "../engine/worldState"

/**
 * 🧠 MULTI-PERSONA TEACHER ENGINE
 */

export function getTeacherPersona() {
  const adaptive = worldState.getAdaptiveState()
  const profile = worldState.getLearnerProfile()

  // 🧠 BASE PERSONA FROM MODE
  let persona = worldState.teacherMode || "coach"

  // 🔁 AUTO OVERRIDE LOGIC
  if (adaptive.level === "support") {
    persona = "support"
  }

  if (adaptive.level === "challenge") {
    persona = "examiner"
  }

  // 🧍 VERY EARLY LEARNER
  if (profile.totalInteractions < 3) {
    persona = "support"
  }

  // ⚡ HIGH FLUENCY LEARNER
  if (profile.avgWordCount > 12) {
    persona = "activator"
  }

  return persona
}