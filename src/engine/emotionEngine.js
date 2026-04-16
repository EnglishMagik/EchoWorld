import { worldState } from "./worldState"

/**
 * 🧠 EMOTION DETECTION ENGINE
 */

export function detectEmotion(userText) {
  const text = userText.toLowerCase()

  let emotion = "neutral"

  if (text.includes("don't understand") || text.includes("confused")) {
    emotion = "confused"
  }

  if (text.includes("this is hard") || text.includes("struggling")) {
    emotion = "frustrated"
  }

  if (text.includes("i get it") || text.includes("easy")) {
    emotion = "confident"
  }

  if (text.includes("ok") || text.length < 10) {
    emotion = "uncertain"
  }

  worldState.logEvent("emotion_detected", { emotion })

  return emotion
}