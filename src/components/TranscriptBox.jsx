import { useSessionStore } from "../store/sessionStore"

export default function TranscriptBox() {
  const messages = useSessionStore((s) => s.messages)

  return (
    <div
      style={{
        height: "300px",
        overflowY: "auto",
        padding: "10px",
        background: "#111",
        color: "white",
        borderRadius: "8px",
        marginTop: "10px",
      }}
    >
      {messages.map((msg, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <strong>{msg.role === "user" ? "You" : "EchoWorld"}:</strong>{" "}
          {msg.text}
        </div>
      ))}
    </div>
  )
}