import { worldState } from "./worldState"

/**
 * 🎞 SESSION REPLAY ENGINE
 * Reconstructs learning session step-by-step
 */

export function getSessionReplay() {
  const history = worldState.getHistory()

  return history.map((event, index) => {
    return {
      step: index + 1,
      type: event.type,
      text: event.payload?.text || "",
      timestamp: event.timestamp,
    }
  })
}

/**
 * 🧠 Summarise learning journey
 */
export function getSessionSummary() {
  const history = worldState.getHistory()

  const userMessages = history.filter(
    (e) => e.type === "user_speech"
  )

  const aiMessages = history.filter(
    (e) => e.type === "ai_response"
  )

  const adaptiveChanges = history.filter(
    (e) => e.type === "adaptive_change"
  )

  return {
    totalEvents: history.length,
    userTurns: userMessages.length,
    aiTurns: aiMessages.length,
    adaptiveShifts: adaptiveChanges.length,
    durationEstimate: `${history.length * 10} sec`,
  }
}