import worldState from "../engine/worldState"
import { useState } from "react"

export default function TeacherControls() {
  const [mode, setMode] = useState(worldState.teacherMode)
  const [mood, setMood] = useState(worldState.mood)

  const updateMode = (newMode) => {
    worldState.teacherMode = newMode
    setMode(newMode)
  }

  const updateMood = (newMood) => {
    worldState.mood = newMood
    setMood(newMood)
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        width: "240px",
        padding: "12px",
        background: "rgba(0,0,0,0.7)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
      }}
    >
      <h4>🎛 Teacher Controls</h4>

      <div style={{ marginTop: "10px" }}>
        <strong>Mode:</strong>

        <div style={{ marginTop: "5px" }}>
          <button onClick={() => updateMode("coach")}>Coach</button>
          <button onClick={() => updateMode("strict")}>Strict</button>
          <button onClick={() => updateMode("friendly")}>Friendly</button>
        </div>
      </div>

      <div style={{ marginTop: "10px" }}>
        <strong>Mood:</strong>

        <div style={{ marginTop: "5px" }}>
          <button onClick={() => updateMood("calm")}>Calm</button>
          <button onClick={() => updateMood("thinking")}>Thinking</button>
          <button onClick={() => updateMood("active")}>Active</button>
        </div>
      </div>

      <div style={{ marginTop: "10px", opacity: 0.7 }}>
        <p>Current Mode: {mode}</p>
        <p>Current Mood: {mood}</p>
      </div>
    </div>
  )
}