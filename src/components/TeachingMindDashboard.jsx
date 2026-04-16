import { useEffect, useState } from "react"
import { worldState } from "../engine/worldState"

export default function TeachingMindDashboard() {
  const [state, setState] = useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      setState({
        consciousness: worldState.teachingConsciousness?.coherence || 0,
        identity: worldState.teachingIdentity?.stability || 0,
        memory: worldState.unifiedMemory?.coherenceScore || 0,
        autonomy: worldState.teachingAutonomy?.currentFocus || "none",
        audit: worldState.systemAudit?.healthScore || 0,
        realtime: worldState.realtimeLoop?.lastSignal || "stable",
        mode: worldState.teacherMode,
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const bar = (v) => ({
    width: `${Math.max(0, Math.min(1, v)) * 100}%`,
    height: "8px",
    background: "limegreen",
    borderRadius: "4px",
  })

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "300px",
        height: "100vh",
        background: "#0b0f1a",
        color: "white",
        padding: "12px",
        fontSize: "12px",
        borderLeft: "1px solid #222",
      }}
    >
      <h3>🧠 Teaching Mind</h3>

      <p>Consciousness</p>
      <div style={bar(state.consciousness)} />

      <p>Identity Stability</p>
      <div style={bar(state.identity)} />

      <p>Memory Coherence</p>
      <div style={bar(state.memory)} />

      <p>System Health</p>
      <div style={bar(state.audit)} />

      <hr />

      <p>Autonomy: {state.autonomy}</p>
      <p>Mode: {state.mode}</p>
      <p>Realtime Signal: {state.realtime}</p>
    </div>
  )
}