import worldState from "../engine/worldState"

/**
 * 🌍 CROSS-SESSION LEARNING NETWORK
 * Learns what teaching strategies work globally
 */

export function updateGlobalLearningNetwork() {
  if (!worldState.globalLearningNetwork) {
    worldState.globalLearningNetwork = {
      strategySuccess: {},
      totalInteractions: 0,
      topStrategies: [],
      emergingPatterns: [],
    }
  }

  const network = worldState.globalLearningNetwork
  const metrics = worldState.teachingMetrics
  const lessonStats = worldState.lessonAnalytics

  if (!metrics || !lessonStats) return network

  network.totalInteractions += 1

  // 🧠 CAPTURE TEACHER MODE EFFECTIVENESS
  const mode = worldState.teacherMode

  if (!network.strategySuccess[mode]) {
    network.strategySuccess[mode] = {
      used: 0,
      successful: 0,
    }
  }

  network.strategySuccess[mode].used += 1

  // 📊 SUCCESS SIGNAL (simple proxy)
  if (metrics.averageClarity > 0.6) {
    network.strategySuccess[mode].successful += 1
  }

  // 🌍 IDENTIFY TOP STRATEGIES
  network.topStrategies = Object.entries(network.strategySuccess)
    .map(([mode, data]) => {
      return {
        mode,
        score: data.successful / data.used,
      }
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.mode)

  // 🧠 EMERGING PATTERNS
  network.emergingPatterns = lessonStats.bestLessonTypes || []

  worldState.logEvent("global_learning_update", network)

  return network
}

export function getGlobalLearningNetwork() {
  return worldState.globalLearningNetwork || null
}