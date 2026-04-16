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

getSessionTimeline() {
  return Array.isArray(this.sessionTimeline)
    ? this.sessionTimeline
    : [];
},

// compatibility alias (fixes old code errors)
getHistory() {
  return this.getSessionTimeline();
},

getSessionSummary() {
  return this.sessionSummary || "";
},

setSessionSummary(summary) {
  this.sessionSummary = summary;
},

clearSession() {
  this.sessionTimeline = [];
  this.sessionSummary = "";
},
};

export default worldState;