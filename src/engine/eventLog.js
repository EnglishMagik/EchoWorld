// src/engine/eventLog.js

class EventLog {
  constructor() {
    this.events = []
  }

  add(eventType, data = {}) {
    const event = {
      type: eventType,
      data,
      timestamp: new Date().toISOString(),
    }

    this.events.push(event)
    return event
  }

  getAll() {
    return this.events
  }

  getByType(type) {
    return this.events.filter((e) => e.type === type)
  }

  clear() {
    this.events = []
  }
}

export const eventLog = new EventLog()