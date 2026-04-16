import { worldState } from "./worldState"

/**
 * 🧠 CURRICULUM SELF-REWRITING ENGINE
 * Evolves lesson structure over time based on performance
 */

export function evolveCurriculum() {
  if (!worldState.curriculum) return null

  if (!worldState.curriculumEvolution) {
    worldState.curriculumEvolution = {
      version: 1,
      history: [],
      removedPatterns: [],
      strengthenedPatterns: [],
    }
  }

  const evolution = worldState.curriculumEvolution
  const curriculum = worldState.curriculum
  const lessonStats = worldState.lessonAnalytics

  if (!lessonStats) return curriculum

  // 📉 IDENTIFY WEAK PATTERNS
  const weakPatterns = Object.entries(
    lessonStats.successRate || {}
  )
    .filter(([_, data]) => data.success / data.attempts < 0.4)
    .map(([key]) => key)

  // ❌ REMOVE WEAK LESSON TYPES
  curriculum.steps = curriculum.steps.filter((step) => {
    if (weakPatterns.includes(step.focus)) {
      evolution.removedPatterns.push(step.focus)
      return false
    }
    return true
  })

  // 💪 STRENGTHEN GOOD PATTERNS
  const strongPatterns = Object.entries(
    lessonStats.successRate || {}
  )
    .filter(([_, data]) => data.success / data.attempts > 0.7)
    .map(([key]) => key)

  evolution.strengthenedPatterns = strongPatterns

  // 📈 ADD NEW OPTIMISED STEPS
  strongPatterns.forEach((pattern) => {
    if (!curriculum.steps.find((s) => s.focus === pattern)) {
      curriculum.steps.push({
        id: curriculum.steps.length + 1,
        title: `Advanced ${pattern} Practice`,
        focus: pattern,
      })
    }
  })

  evolution.version += 1
  evolution.history.push({
    timestamp: new Date().toISOString(),
    weakPatterns,
    strongPatterns,
  })

  worldState.logEvent("curriculum_evolution", evolution)

  return curriculum
}

export function getCurriculumEvolution() {
  return worldState.curriculumEvolution || null
}