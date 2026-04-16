import { worldState } from "./worldState"

/**
 * 🧠 META-TEACHER CONTROLLER
 * Decides how the system should evolve itself
 */

export function runMetaTeacherCycle() {
  if (!worldState.metaTeacher) {
    worldState.metaTeacher = {
      cycle: 0,
      recommendations: [],
      focusArea: "balanced",
      systemHealth: {},
    }
  }

  const meta = worldState.metaTeacher

  meta.cycle += 1

  const metrics = worldState.teachingMetrics
  const lessonStats = worldState.lessonAnalytics
  const globalNet = worldState.globalLearningNetwork

  if (!metrics || !lessonStats || !globalNet) {
    return meta
  }

  // 🧠 SYSTEM HEALTH SCORING
  meta.systemHealth = {
    teachingClarity: metrics.averageClarity || 0,
    curriculumStrength: lessonStats.totalLessons || 0,
    globalAlignment: globalNet.totalInteractions || 0,
  }

  // 📉 DETECT WEAK SYSTEM AREAS
  const weaknesses = []

  if (meta.systemHealth.teachingClarity < 0.5) {
    weaknesses.push("teaching_engine")
  }

  if (lessonStats.totalLessons < 10) {
    weaknesses.push("curriculum_depth")
  }

  if (globalNet.totalInteractions < 20) {
    weaknesses.push("global_learning")
  }

  // 🧠 DECIDE NEXT FOCUS AREA
  let focusArea = "balanced"

  if (weaknesses.includes("teaching_engine")) {
    focusArea = "teaching_quality"
  } else if (weaknesses.includes("curriculum_depth")) {
    focusArea = "curriculum_expansion"
  } else if (weaknesses.includes("global_learning")) {
    focusArea = "network_learning"
  }

  meta.focusArea = focusArea

  // 📌 GENERATE META RECOMMENDATION
  meta.recommendations = [
    {
      priority: "high",
      action: `Strengthen ${focusArea}`,
      reason: `Detected weakness in ${weaknesses.join(", ") || "system balance"}`,
    },
  ]

  worldState.logEvent("meta_teacher_cycle", meta)

  return meta
}

export function getMetaTeacherState() {
  return worldState.metaTeacher || null
}