import { useState } from "react"
import { getSessionReplay, getSessionSummary } from "../engine/sessionReplay"

export default function SessionReplayPanel() {
  const [replay, setReplay] = useState([])
  const [summary, setSummary] = useState(null)

  const handleLoad = () => {
    const data = getSessionReplay()
    const sum = getSessionSummary()

    setReplay(data)
    setSummary(sum)
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        width: "300px",
        padding: "12px",
        background: "rgba(0,0,0,0.8)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
        maxHeight: "400px",
        overflowY: "auto",
      }}
    >
      <h4>🎞 Session Replay</h4>

      <button
        onClick={handleLoad}
        style={{
          width: "100%",
          padding: "6px",
          marginTop: "8px",
          borderRadius: "6px",
        }}
      >
        Load Replay
      </button>

      {summary && (
        <div style={{ marginTop: "10px", opacity: 0.8 }}>
          <p>Events: {summary.totalEvents}</p>
          <p>User turns: {summary.userTurns}</p>
          <p>AI turns: {summary.aiTurns}</p>
          <p>Adaptive shifts: {summary.adaptiveShifts}</p>
          <p>Duration: {summary.durationEstimate}</p>
        </div>
      )}

      {replay.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          {replay.map((item) => (
            <div
              key={item.step}
              style={{
                marginBottom: "8px",
                padding: "6px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "6px",
              }}
            >
              <strong>
                {item.type === "user_speech"
                  ? "🧍 User"
                  : item.type === "ai_response"
                  ? "🤖 AI"
                  : "⚙️ System"}
              </strong>

              <p style={{ margin: "4px 0" }}>{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}