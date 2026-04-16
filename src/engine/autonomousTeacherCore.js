import worldState from "../engine/worldState"

/**
 * 🧠 AUTONOMOUS TEACHER CORE
 * Allows EchoWorld to initiate teaching proactively
 */

export function runAutonomousTeacherCycle() {
  if (!worldState.autonomousTeacher) {
    worldState.autonomousTeacher = {
      active: true,
      lastAction: null,
      idleCycles: 0,
      suggestions: [],
    }
  }

  const system = worldState.autonomousTeacher

  const engagement = worldState.engagement
  const trust = worldState.trust
  const phase = worldState.learningPhase
  const focus = worldState.teachingAutonomy?.currentFocus

  system.idleCycles += 1

  let action = null

  // 🧠 LOW ENGAGEMENT → INITIATE HELP
  if (engagement?.trend === "low") {
    action = {
      type: "engage_user",
      message: "Would you like a quick practice exercise?",
    }
  }

  // 🧠 HIGH TRUST + HIGH ENGAGEMENT → CHALLENGE
  if (engagement?.trend === "high" && trust?.trend === "high") {
    action = {
      type: "challenge_user",
      message: "Try describing your day using 3 new words you haven't used before.",
    }
  }

  // 🧠 BEGINNER SUPPORT LOOP
  if (phase === "beginner") {
    action = {
      type: "guided_prompt",
      message: "Let’s practice a simple sentence together. Can you say hello?",
    }
  }

  // 🧠 AUTONOMOUS FOCUS OVERRIDE
  if (focus === "confidence_building") {
    action = {
      type: "confidence_prompt",
      message: "Say one thing you're confident about today.",
    }
  }

  // 🧠 ONLY TRIGGER IF IDLE ENOUGH
  if (system.idleCycles < 2) {
    return null
  }

  system.lastAction = action
  system.idleCycles = 0

  if (action) {
    system.suggestions.push({
      ...action,
      timestamp: new Date().toISOString(),
    })

    worldState.logEvent("autonomous_teacher_action", action)
  }

  return action
}

export function getAutonomousTeacherState() {
  return worldState.autonomousTeacher || null
}