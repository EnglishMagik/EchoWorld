import worldState from "../engine/worldState"
import { getLearnerIdentity } from "./learnerIdentity"
import { getLongTermMemory } from "./longTermMemory"

/**
 * 📚 AUTOMATIC CURRICULUM BUILDER
 * Generates multi-step learning progression
 */

export function generateCurriculum() {
  const profile = worldState.getLearnerProfile()
  const identity = getLearnerIdentity()
  const memory = getLongTermMemory()

  if (!worldState.curriculum) {
    worldState.curriculum = {
      currentIndex: 0,
      steps: [],
      lastGenerated: null,
    }
  }

  const curriculum = worldState.curriculum

  // 🧠 BASE LEARNING LEVEL
  let level = "foundation"

  if (identity.fluencyTrend === "improving") {
    level = "intermediate"
  }

  if (profile.avgWordCount > 12) {
    level = "advanced"
  }

  if (memory?.teachingStrategy === "expansion_focus") {
    level = "fluency_expansion"
  }

  // 📚 BUILD CURRICULUM STEPS
  const steps = [
    {
      id: 1,
      title: "Warm-up Conversation",
      focus: "confidence building",
    },
    {
      id: 2,
      title: "Core Vocabulary Expansion",
      focus: "lexical growth",
    },
    {
      id: 3,
      title: "Structured Dialogue Practice",
      focus: "sentence formation",
    },
    {
      id: 4,
      title: "Guided Roleplay",
      focus: "real-world usage",
    },
    {
      id: 5,
      title: "Free Expression Task",
      focus: "fluency development",
    },
  ]

  // 🧠 ADAPT STEPS BASED ON LEARNER

  if (level === "foundation") {
    steps[1].title = "Basic Vocabulary Building"
    steps[4].title = "Simple Guided Speaking"
  }

  if (level === "advanced") {
    steps.push({
      id: 6,
      title: "Debate Challenge",
      focus: "critical thinking",
    })
  }

  if (level === "fluency_expansion") {
    steps.push({
      id: 6,
      title: "Rapid Response Training",
      focus: "speed + fluency",
    })
  }

  // 💾 SAVE CURRICULUM
  curriculum.steps = steps
  curriculum.lastGenerated = new Date().toISOString()

  worldState.logEvent("curriculum_generated", {
    level,
    steps: steps.length,
  })

  return curriculum
}

export function getCurriculum() {
  return worldState.curriculum || null
}