import worldState from "../engine/worldState"

export function evaluateTeachingEffect(userText, aiResponse) {
  if (!worldState.teachingMetrics) {
    worldState.teachingMetrics = {
      total: 0,
      effective: 0,
      unclear: 0,
      averageClarity: 0,
      strategyScore: 50,
      lastSignal: "neutral",
    }
  }

  const metrics = worldState.teachingMetrics

  metrics.total += 1

  const words = userText.trim().split(" ")
  const length = words.length

  // 🧠 SIGNAL DETECTION
  let signal = "neutral"

  if (length < 4) signal = "confused"
  if (length > 10) signal = "engaged"

  // 📊 SCORE UPDATE
  let effectiveness = 0

  if (signal === "engaged") effectiveness += 2
  if (signal === "confused") effectiveness -= 2

  if (effectiveness > 0) {
    metrics.effective += 1
  } else {
    metrics.unclear += 1
  }

  metrics.averageClarity =
    metrics.effective / metrics.total

  metrics.lastSignal = signal

  // 🎯 ADAPTIVE STRATEGY FEEDBACK LOOP

  if (signal === "confused") {
    worldState.teacherMode = "support"
    worldState.adaptiveState.level = "support"
  }

  if (signal === "engaged") {
    worldState.teacherMode = "challenge"
    worldState.adaptiveState.level = "challenge"
  }

  if (signal === "neutral") {
    worldState.teacherMode = "coach"
  }

  worldState.logEvent("teaching_feedback_loop", {
    signal,
    metrics,
  })

  return metrics
}

export function getTeachingMetrics() {
  return worldState.teachingMetrics || null
}