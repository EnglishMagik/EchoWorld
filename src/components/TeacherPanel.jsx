import { useState, useEffect } from "react"
import worldState from "../engine/worldState"


export default function TeacherPanel() {
  const [mode, setMode] = useState(worldState.teacherMode)

  const modes = [
    {
      id: "coach",
      label: "👩‍🏫 Coach",
      desc: "Supportive + gentle feedback",
    },
    {
      id: "examiner",
      label: "🧑‍🏫 Examiner",
      desc: "Strict + structured evaluation",
    },
    {
      id: "fluency",
      label: "🎯 Fluency Trainer",
      desc: "Pushes speed + complexity",
    },
  ]

  const changeMode = (newMode) => {
    worldState.setTeacherMode(newMode)
    setMode(newMode)
  }

  // keep in sync if changed elsewhere
  useEffect(() => {
    const interval = setInterval(() => {
      setMode(worldState.teacherMode)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "220px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
      }}
    >
      <h4>🎛️ Teacher Mode</h4>

      {modes.map((m) => (
        <div
          key={m.id}
          onClick={() => changeMode(m.id)}
          style={{
            marginTop: "10px",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              mode === m.id ? "rgba(255,255,255,0.15)" : "transparent",
            border:
              mode === m.id
                ? "1px solid rgba(255,255,255,0.3)"
                : "1px solid transparent",
          }}
        >
          <strong>{m.label}</strong>
          <p style={{ margin: 0, opacity: 0.7 }}>{m.desc}</p>
        </div>
      ))}
    </div>
  )
}