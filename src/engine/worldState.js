class WorldState {
  constructor() {
    this.mood = "calm"
    this.currentScene = "default"
    this.teacherMode = false

    this.user = {
      level: 1,
      xp: 0,
    }

    this.relationship = {
      dominantEmotion: "neutral",
    }

    this.engagement = { trend: "stable" }
    this.trust = { trend: "stable" }

    this.history = []
  }

  getHistory() {
    return this.history || []
  }

  addToHistory(entry) {
    this.history.push(entry)
    if (this.history.length > 200) this.history.shift()
  }

  getSessionSummary() {
    return {
      totalEvents: this.history.length,
    }
  }

  logEvent(type, data) {
    this.addToHistory({ type, data, t: Date.now() })
  }
}

export const worldState = new WorldState()