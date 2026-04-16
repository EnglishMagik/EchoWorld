import worldState from "../engine/worldState"
import { useState } from "react"

export default function ScenarioLibrary() {
  const [open, setOpen] = useState(false)

  const scenarios = worldState.generatedScenarios || {}

  const loadScenario = (id) => {
    worldState.setScenario(id)
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "20px",
        top: "20px",
        width: "240px",
        padding: "10px",
        background: "rgba(0,0,0,0.7)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "6px",
          borderRadius: "6px",
          border: "none",
        }}
      >
        📚 Scenario Library
      </button>

      {open && (
        <div style={{ marginTop: "10px" }}>
          {Object.keys(scenarios).length === 0 && (
            <p style={{ opacity: 0.6 }}>No scenarios yet</p>
          )}

          {Object.entries(scenarios).map(([id, s]) => (
            <div
              key={id}
              style={{
                padding: "6px",
                marginBottom: "6px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => loadScenario(id)}
            >
              <strong>{s.title || s.name}</strong>
              <p style={{ margin: 0, opacity: 0.6 }}>
                {s.description?.slice(0, 60)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}