import { worldState } from "./worldState"

export function getWorldVisualState() {
  const mood = worldState.mood || "calm"

  const base = {
    background: "#0b0f1a",
    blur: 0,
    saturation: 1,
  }

  if (mood === "thinking") {
    base.background = "linear-gradient(to bottom, #120f1f, #1a1433)"
  }

  if (mood === "active") {
    base.background = "linear-gradient(to bottom, #0f1a14, #0f2a1a)"
  }

  if (mood === "calm") {
    base.background = "linear-gradient(to bottom, #0b0f1a, #11182a)"
  }

  return base
}