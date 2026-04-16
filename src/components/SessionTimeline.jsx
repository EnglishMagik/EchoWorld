import { worldState } from "../engine/worldState"

export default function SessionTimeline() {
  const events = worldState.getSessionTimeline()

  return (
    <div
      style={{
        position: "absolute",
        left: "20px",
        bottom: "20px",
        width: "260px",
        maxHeight: "300px",
        overflowY: "auto",
        padding: "10px",
        background: "rgba(0,0,0,0.6)",
        borderRadius: "10px",
        color: "white",
        fontSize: "11px",
      }}
    >
      <h4>🧾 Session Timeline</h4>

      {events.slice(-10).map((e, i) => (
        <div
          key={i}
          style={{
            marginBottom: "8px",
            paddingBottom: "6px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <strong>{e.type}</strong>
          <p style={{ margin: 0, opacity: 0.7 }}>
            {e.payload?.text || JSON.stringify(e.payload)}
          </p>
        </div>
      ))}
    </div>
  )
}