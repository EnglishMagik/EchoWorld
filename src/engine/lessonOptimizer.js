import worldState from "../engine/worldState"

/**
 * 🧠 SELF-OPTIMISING LESSON GENERATOR
 * Improves curriculum structure over time
 */

export function optimizeLessons() {
  if (!worldState.lessonAnalytics) {
    worldState.lessonAnalytics = {
      totalLessons: 0,
      successRate: {},
      bestLessonTypes: [],
    }
  }

  const analytics = worldState.lessonAnalytics
  const curriculum = worldState.curriculum

  if (!curriculum) return null

  analytics.totalLessons += 1

  // 📊 TRACK STEP PERFORMANCE
  curriculum.steps.forEach((step) => {
    const key = step.focus

    if (!analytics.successRate[key]) {
      analytics.successRate[key] = {
        attempts: 0,
        success: 0,
      }
    }

    analytics.successRate[key].attempts += 1

    // fake proxy metric: fluency improvement
    const profile = worldState.getLearnerProfile()

    if (profile.avgWordCount > 10) {
      analytics.successRate[key].success += 1
    }
  })

  // 🧠 FIND BEST LESSON TYPES
  analytics.bestLessonTypes = Object.entries(
    analytics.successRate
  )
    .sort((a, b) => b[1].success - a[1].success)
    .map(([key]) => key)

  worldState.logEvent("lesson_optimization", analytics)

  return analytics
}