import { worldState } from "./worldState"

export function getEchoWorldCoreSnapshot() {
  return {
    cognition: {
      identity: worldState.teachingIdentity,
      consciousness: worldState.teachingConsciousness,
      autonomy: worldState.teachingAutonomy,
    },

    memory: {
      unified: worldState.unifiedMemory,
    },

    learning: {
      scenario: worldState.scenarioSystem?.current,
      engagement: worldState.engagement,
      trust: worldState.trust,
    },

    system: {
      stability: worldState.systemStability,
      audit: worldState.systemAudit,
    },

    ui: {
      mood: worldState.mood,
      visual: worldState.visualState,
    },
  }
}