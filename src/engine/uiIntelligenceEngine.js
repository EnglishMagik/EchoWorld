import { worldState } from "./worldState"

/**
 * 🎨 UI INTELLIGENCE ENGINE
 * Makes UI components adaptive to AI state
 */

export function getUIIntelligence() {
  const mood = worldState.mood
  const trust = worldState.trust?.trend || "stable"
  const engagement = worldState.engagement?.trend || "stable"
  const emotion = worldState.relationship?.dominantEmotion

  return {
    buttonStyle: {
      glow: engagement === "high" ? 0.8 : 0.3,
      scale: engagement === "high" ? 1.05 : 1,
      tone:
        mood === "active"
          ? "energetic"
          : mood === "thinking"
          ? "focused"
          : "calm",
    },

    panelStyle: {
      opacity: trust === "low" ? 0.7 : 1,
      blur: emotion === "confused" ? 10 : 6,
      borderGlow: trust === "high",
    },

    textStyle: {
      readability: emotion === "confused" ? "high" : "normal",
      warmth: mood === "calm" ? "soft" : "neutral",
    },
  }
}