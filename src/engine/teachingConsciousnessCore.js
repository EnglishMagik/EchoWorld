import worldState from "../engine/worldState"

/**
 * 🧠 TEACHING CONSCIOUSNESS CORE
 * Synthesises all subsystems into one unified state per interaction
 */

export function buildTeachingConsciousness(context = {}) {
  const {
    teachingIdentity,
    unifiedMemory,
    autonomy,
    scenario,
    realtimeAdjustment,
    constitutionCheck,
    metaCognition,
  } = context

  if (!worldState.teachingConsciousness) {
    worldState.teachingConsciousness = {
      state: null,
      coherence: 0.5,
      history: [],
    }
  }

  const core = worldState.teachingConsciousness

  // 🧠 BUILD CONSCIOUS STATE
  const state = {
    identity: teachingIdentity?.snapshot || null,
    memory: unifiedMemory?.snapshot || null,
    focus: autonomy?.currentFocus || "basic_conversation",
    scenario: scenario || null,
    realTime: realtimeAdjustment?.action || "stable",
    violations: constitutionCheck?.violations || [],
    awareness: metaCognition?.awarenessScore || 0.5,
  }

  // 🧠 COHERENCE CALCULATION
  let chaos = 0

  if (state.violations.length > 0) chaos += 0.2 * state.violations.length
  if (state.realTime === "increase_supportiveness" && state.scenario?.difficulty > 3) chaos += 0.2
  if (state.awareness > 0.8 && state.memory?.insights?.length === 0) chaos += 0.2

  const coherence = 1 - chaos

  core.coherence = core.coherence * 0.8 + coherence * 0.2
  core.state = state

  core.history.push({
    state,
    coherence: core.coherence,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("teaching_consciousness_update", {
    coherence: core.coherence,
  })

  return {
    state,
    coherence: core.coherence,
  }
}

export function getTeachingConsciousness() {
  return worldState.teachingConsciousness || null
}