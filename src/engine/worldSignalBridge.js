import { uiEventBus } from "./uiEventBus"
import { worldState } from "./worldState"

export function broadcastWorldSignals() {
  uiEventBus.emit("mood", worldState.mood)
  uiEventBus.emit("trust", worldState.trust?.trend || "stable")
  uiEventBus.emit("engagement", worldState.engagement?.trend || "stable")
  uiEventBus.emit(
    "emotion",
    worldState.relationship?.dominantEmotion || "neutral"
  )
  uiEventBus.emit(
    "coherence",
    worldState.teachingConsciousness?.coherence || 0
  )
}