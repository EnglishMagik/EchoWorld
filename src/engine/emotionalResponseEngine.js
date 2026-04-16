import worldState from "../engine/worldState"

/**
 * ❤️ EMOTIONAL RESPONSE ENGINE
 * Adjusts HOW the teacher responds emotionally
 */

export function applyEmotionalIntelligence(emotion) {
  let profile = {
    toneShift: "neutral",
    pacing: "medium",
    encouragement: "normal",
  }

  if (emotion === "frustrated") {
    profile = {
      toneShift: "gentle",
      pacing: "slow",
      encouragement: "high",
    }
  }

  if (emotion === "confused") {
    profile = {
      toneShift: "calm",
      pacing: "slow",
      encouragement: "high",
    }
  }

  if (emotion === "confident") {
    profile = {
      toneShift: "energetic",
      pacing: "fast",
      encouragement: "medium",
    }
  }

  if (emotion === "uncertain") {
    profile = {
      toneShift: "supportive",
      pacing: "medium",
      encouragement: "high",
    }
  }

  worldState.logEvent("emotional_adjustment", profile)

  return profile
}