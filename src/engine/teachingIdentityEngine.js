import worldState from "../engine/worldState"

/**
 * 🧠 TEACHING IDENTITY STABILISATION ENGINE (CLEAN VERSION)
 * Creates one unified "teaching self" from all subsystems
 */

export function buildTeachingIdentitySnapshot(context = {}) {
  if (!worldState.teachingIdentity) {
    worldState.teachingIdentity = {
      snapshot: null,
      stability: 0.5,
      history: [],
    }
  }

  const identity = worldState.teachingIdentity

  const {
    personality,
    teachingMode,
    emotion,
    engagement,
    trust,
    autonomy,
    constitutionCheck,
  } = context

  // 🧠 BUILD UNIFIED IDENTITY
  const snapshot = {
    tone: personality?.coreTone || "neutral",
    style: personality?.style || "balanced",
    mode: teachingMode || "coach",
    emotion: emotion || "neutral",
    engagement: engagement?.trend || "stable",
    trust: trust?.trend || "stable",
    focus: autonomy?.currentFocus || "basic_conversation",
  }

  // 🧠 STABILITY CALCULATION
  let instability = 0

  if (snapshot.mode === "challenger" && snapshot.trust === "low") {
    instability += 0.3
  }

  if (snapshot.mode === "examiner" && snapshot.emotion === "confused") {
    instability += 0.25
  }

  if (snapshot.engagement === "low" && snapshot.mode === "challenger") {
    instability += 0.2
  }

  if (constitutionCheck?.violations?.length > 0) {
    instability += 0.2 * constitutionCheck.violations.length
  }

  // 🧠 UPDATE STABILITY (SMOOTHED)
  const newStability = 1 - instability
  identity.stability = identity.stability * 0.8 + newStability * 0.2
  identity.stability = Math.max(0, Math.min(1, identity.stability))

  identity.snapshot = snapshot

  identity.history.push({
    snapshot,
    stability: identity.stability,
    timestamp: new Date().toISOString(),
  })

  worldState.logEvent("teaching_identity_snapshot", {
    snapshot,
    stability: identity.stability,
  })

  return {
    snapshot,
    stability: identity.stability,
  }
}

export function getTeachingIdentity() {
  return worldState.teachingIdentity || null
}