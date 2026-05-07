// src/engine/worldState.js

const worldState = {

  // ─────────────────────────────
  // SESSION DATA
  // ─────────────────────────────
  sessionTimeline: [],
  sessionSummary: "",

  // ─────────────────────────────
  // USER + ADAPTIVE STATE
  // ─────────────────────────────
  user: {
    level: 1,
    name: "Learner",
    xp: 0,
  },

  adaptiveState: {
    level: "normal", // "support" | "normal" | "challenge"
  },

  teacherMode: "coach",

  mood: "calm", // "calm" | "thinking" | "active"

  currentScene: "safe_room",

  learningPhase: "beginner",

  // ─────────────────────────────
  // ACHIEVEMENTS
  // ─────────────────────────────
  achievements: [],

  addAchievement(text) {
    this.achievements.push(text)
    this.logEvent("achievement_unlocked", { text })
  },

  // ─────────────────────────────
  // NARRATIVE
  // ─────────────────────────────
  _narrative: [],

  getNarrative() {
    return this._narrative
  },

  addNarrative(text) {
    this._narrative.push({
      text,
      timestamp: new Date().toISOString(),
    })
  },

  // ─────────────────────────────
  // SCENARIO SYSTEM
  // ─────────────────────────────
  generatedScenarios: {},

  setScenario(id) {
    if (this.generatedScenarios[id]) {
      if (!this.scenarioSystem) {
        this.scenarioSystem = { current: null, history: [] }
      }
      this.scenarioSystem.current = this.generatedScenarios[id]
      this.addSessionEvent(`Scenario loaded: ${id}`)
    }
  },

  // ─────────────────────────────
  // TEACHER MODE
  // ─────────────────────────────
  setTeacherMode(mode) {
    this.teacherMode = mode
    this.logEvent("teacher_mode_changed", { mode })
  },

  // ─────────────────────────────
  // LEARNER PROFILE
  // ─────────────────────────────
  _learnerProfile: {
    totalInteractions: 0,
    avgWordCount: 0,
    strongResponses: 0,
    shortResponses: 0,
    _wordCountHistory: [],
  },

  getLearnerProfile() {
    return this._learnerProfile
  },

  updateLearnerProfile(userText) {
    const profile = this._learnerProfile
    const words = userText.trim().split(" ").filter(Boolean)
    const count = words.length

    profile.totalInteractions += 1
    profile._wordCountHistory.push(count)

    const total = profile._wordCountHistory.reduce((a, b) => a + b, 0)
    profile.avgWordCount = total / profile._wordCountHistory.length

    if (count > 10) profile.strongResponses += 1
    if (count < 4) profile.shortResponses += 1
  },

  // ─────────────────────────────
  // ADAPTIVE STATE
  // ─────────────────────────────
  getAdaptiveState() {
    return this.adaptiveState
  },

  // ─────────────────────────────
  // VOCABULARY TRACKING
  // ─────────────────────────────
  _wordFrequency: {},
  _selectedWord: null,

  getTopWords(limit = 5) {
    return Object.entries(this._wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([word]) => word)
  },

  // VocabPanel uses getTopVocabulary() — returns objects {word, count}
  getTopVocabulary(limit = 8) {
    return Object.entries(this._wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([word, count]) => ({ word, count }))
  },

  selectWord(word) {
    this._selectedWord = {
      word,
      meaning: "",  // to be populated by AI in future
      example: "",  // to be populated by AI in future
    }
  },

  getSelectedWordInfo() {
    return this._selectedWord
  },

  trackWords(userText) {
    const stopWords = new Set(["i", "a", "the", "is", "it", "to", "and", "of", "in", "my"])
    userText.toLowerCase().split(/\s+/).forEach((word) => {
      const clean = word.replace(/[^a-z]/g, "")
      if (clean.length > 2 && !stopWords.has(clean)) {
        this._wordFrequency[clean] = (this._wordFrequency[clean] || 0) + 1
      }
    })
  },

  // ─────────────────────────────
  // TEACHER MEMORY
  // ─────────────────────────────
  _teacherMemory: {
    corrections: 0,
    encouragements: 0,
  },

  getTeacherMemory() {
    return this._teacherMemory
  },

  // ─────────────────────────────
  // LESSON STATE
  // ─────────────────────────────
  _lessonState: {
    phase: "warmup", // "warmup" | "practice" | "production"
    complete: false,
    summary: null,
  },

  getLessonState() {
    return this._lessonState
  },

  completeLesson(summaryData) {
    this._lessonState.complete = true
    this._lessonState.summary = summaryData
    this.logEvent("lesson_complete", summaryData)
  },

  resetLesson() {
    this._lessonState = {
      phase: "warmup",
      complete: false,
      summary: null,
    }
    this.clearSession()
  },

  // ─────────────────────────────
  // VOICE
  // ─────────────────────────────
  _voice: {},

  getVoice() {
    return this._voice
  },

  // ─────────────────────────────
  // EVENT LOG
  // ─────────────────────────────
  _eventLog: [],

  logEvent(type, data = {}) {
    const entry = {
      type,
      data,
      timestamp: new Date().toISOString(),
    }
    this._eventLog.push(entry)
    // Suppress noisy tick/update events from the visible session timeline
    // This fixes the timeline noise issue Sally flagged
    if (!type.includes("_tick") && !type.includes("_update")) {
      this.addSessionEvent(`[${type}]`)
    }
  },

  getEventLog() {
    return this._eventLog
  },

  // ─────────────────────────────
  // SESSION TIMELINE
  // ─────────────────────────────
  addSessionEvent(event) {
    this.sessionTimeline.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      event,
    })
  },

  getSessionTimeline() {
    return Array.isArray(this.sessionTimeline)
      ? this.sessionTimeline
      : []
  },

  // compatibility alias
  getHistory() {
    return this.getSessionTimeline()
  },

  getSessionSummary() {
    return this.sessionSummary || ""
  },

  setSessionSummary(summary) {
    this.sessionSummary = summary
  },

  // ─────────────────────────────
  // FULL RESET
  // ─────────────────────────────
  clearSession() {
    this.sessionTimeline = []
    this.sessionSummary = ""
    this._narrative = []
    this._selectedWord = null
    this._learnerProfile = {
      totalInteractions: 0,
      avgWordCount: 0,
      strongResponses: 0,
      shortResponses: 0,
      _wordCountHistory: [],
    }
    this._wordFrequency = {}
    this._eventLog = []
    this._lessonState = {
      phase: "warmup",
      complete: false,
      summary: null,
    }
  },
}

export default worldState