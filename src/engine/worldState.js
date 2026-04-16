// src/engine/worldState.js

const worldState = {
  // session data
  sessionTimeline: [],
  sessionSummary: "",

  // add a timeline event
  addSessionEvent(event) {
    this.sessionTimeline.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      event,
    });
  },

  // get full timeline (used by UI)
  getSessionTimeline() {
    return this.sessionTimeline;
  },

  // get summary (safe fallback)
  getSessionSummary() {
    return this.sessionSummary || "";
  },

  // update summary
  setSessionSummary(summary) {
    this.sessionSummary = summary;
  },

  // clear session
  clearSession() {
    this.sessionTimeline = [];
    this.sessionSummary = "";
  },
};

export default worldState;