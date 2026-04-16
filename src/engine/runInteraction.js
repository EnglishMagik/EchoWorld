import worldState from "../engine/worldState"

// Core safe engines (only those assumed stable)
import { runRealtimeFeedbackLoop } from "./realtimeFeedbackLoop"
import { compressLearningMemory } from "./learningMemoryCompressionEngine"
import { determineNextTeachingFocus } from "./teachingAutonomyEngine"
import { runSelfImprovementLoop } from "./selfImprovementLoop"
import { runMetaCognitiveLayer } from "./metaCognitiveEngine"
import { runAutonomousTeacherCycle } from "./autonomousTeacherCore"
import { evaluateTeachingConstitution } from "./teachingConstitution"
import { buildTeachingIdentitySnapshot } from "./teachingIdentityEngine"
import { buildUnifiedMemory } from "./unifiedMemoryCore"
import { buildTeachingConsciousness } from "./teachingConsciousnessCore"
import { runSystemStabiliser } from "./systemStabiliser"
import { runSystemAudit } from "./systemIntegrationAudit"

// UI + safety layer
import { broadcastWorldSignals } from "./worldSignalBridge"
import { runArchitectureStabiliser } from "./architectureStabiliser"

import { sendToAI } from "../api/sendToAI"

export async function runInteraction(userText) {
  // ─────────────────────────────
  // CORE SAFE STATE
  // ─────────────────────────────
  const scenario = worldState.scenarioSystem?.current || null
  const teachingMode = worldState.teacherMode || "default"
  const emotion = worldState.relationship?.dominantEmotion || "neutral"
  const engagement = worldState.engagement || {}
  const trust = worldState.trust || {}
  const personality = worldState.teachingPersonality || {}

  // ─────────────────────────────
  // REALTIME FEEDBACK
  // ─────────────────────────────
  const realtimeAdjustment = runRealtimeFeedbackLoop(userText)

  // ─────────────────────────────
  // LEARNING LAYER
  // ─────────────────────────────
  compressLearningMemory()

  const nextTeachingFocus = determineNextTeachingFocus()

  const constitutionCheck = evaluateTeachingConstitution({
    emotion,
    engagement,
    trust,
    teachingMode,
    scenario,
  })

  // ─────────────────────────────
  // IDENTITY
  // ─────────────────────────────
  const teachingIdentity = buildTeachingIdentitySnapshot({
    personality,
    teachingMode,
    emotion,
    engagement,
    trust,
    autonomy: worldState.teachingAutonomy || {},
    constitutionCheck,
  })

  // ─────────────────────────────
  // MEMORY
  // ─────────────────────────────
  const unifiedMemory = buildUnifiedMemory()

  // ─────────────────────────────
  // COGNITIVE LAYERS
  // ─────────────────────────────
  runSelfImprovementLoop(userText)

  runMetaCognitiveLayer({
    teachingMode,
    emotion,
    engagement,
    trust,
    nextTeachingFocus,
  })

  runAutonomousTeacherCycle()

  // ─────────────────────────────
  // CONSCIOUSNESS
  // ─────────────────────────────
  const teachingConsciousness = buildTeachingConsciousness({
    teachingIdentity,
    unifiedMemory,
    autonomy: worldState.teachingAutonomy || {},
    scenario,
    realtimeAdjustment,
    constitutionCheck,
    metaCognition: worldState.metaCognition || {},
  })

  // ─────────────────────────────
  // AI RESPONSE
  // ─────────────────────────────
  const aiResponse = await sendToAI({
    input: userText,

    scene: scenario,
    mood: worldState.mood || "calm",
    teacherMode: teachingMode,
    userLevel: worldState.user?.level || 1,

    realtimeAdjustment,
    nextTeachingFocus,
    constitutionCheck,
    teachingIdentity,
    unifiedMemory,
    teachingConsciousness,

    history: worldState.getHistory?.() || [],
  })

  // ─────────────────────────────
  // POST SYSTEM STABILITY
  // ─────────────────────────────
  runSystemStabiliser()
  runSystemAudit()
  broadcastWorldSignals()
  runArchitectureStabiliser()

  return aiResponse
}