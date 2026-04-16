import { useSessionStore } from "../store/sessionStore"
import worldState from "../engine/worldState"

export default function MemoryPanel() {
  const messages = useSessionStore((s) => s.messages)
  const history = worldState.getHistory()

  return (
    <div
      style={{
        padding: "12px",
        background: "#0b0f1a",
        color: "white",
        borderRadius: "10px",
        marginTop: "10px",
        maxHeight: "200px",
        overflowY: "auto",
        fontSize: "12px",
      }}
    >
      <h3>🧠 Learning Memory</h3>

      {history.slice(-10).map((event, index) => (
        <div
          key={index}
          style={{
            marginBottom: "8px",
            opacity: 0.85,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            paddingBottom: "4px",
          }}
        >
          <strong>{event.type}</strong>
          <div style={{ fontSize: "11px", opacity: 0.7 }}>
            {JSON.stringify(event.payload)}
          </div>
        </div>
      ))}

      <hr style={{ margin: "10px 0", opacity: 0.2 }} />

      <strong>💬 Chat Memory</strong>

      {messages.slice(-5).map((msg, index) => (
        <div key={index} style={{ marginTop: "6px" }}>
          <strong>{msg.role}:</strong> {msg.text}
        </div>
      ))}
    </div>
  )
}