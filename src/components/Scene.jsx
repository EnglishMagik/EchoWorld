import { useSessionStore } from "../store/sessionStore"
import { worldState } from "../engine/worldState"

import LearnerDashboard from "./LearnerDashboard"
import TeachingMindDashboard from "./TeachingMindDashboard"

import SpeechPanel from "./SpeechPanel"
import TeacherPanel from "./TeacherPanel"
import SessionTimeline from "./SessionTimeline"
import ScenarioBuilder from "./ScenarioBuilder"
import ScenarioLibrary from "./ScenarioLibrary"

import { getWorldVisualState } from "../engine/worldVisualEngine"

export default function Scene() {
  const messages = useSessionStore((s) => s.messages || [])

  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : null

  const summary = worldState.getSessionSummary?.() || {
    totalEvents: 0,
  }

  const visual = getWorldVisualState()

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateColumns: "260px 1fr 300px",
        background: visual.background,
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* LEFT */}
      <div className="panel" style={{ margin: 10 }}>
        <h3>EchoWorld</h3>
        <p>Mood: {worldState.mood}</p>
        <p>Scene: {worldState.currentScene}</p>
        <p>Session: {summary.totalEvents}</p>

        <LearnerDashboard />
      </div>

      {/* CENTER */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="panel" style={{ maxWidth: 600 }}>
          <h2>Learning Session</h2>

          {lastMessage && (
            <div>
              <strong>
                {lastMessage.role === "user" ? "You said:" : "AI replied:"}
              </strong>
              <p>{lastMessage.text}</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ margin: 10, overflowY: "auto" }}>
        <div className="panel"><TeacherPanel /></div>
        <div className="panel"><SpeechPanel /></div>
        <div className="panel"><SessionTimeline /></div>
        <div className="panel"><ScenarioBuilder /></div>
        <div className="panel"><ScenarioLibrary /></div>
        <div className="panel"><TeachingMindDashboard /></div>
      </div>
    </div>
  )
}