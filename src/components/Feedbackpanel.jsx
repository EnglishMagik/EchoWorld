import { useSessionStore } from "../store/sessionStore"

export default function FeedbackPanel() {
  const messages = useSessionStore((s) => s.messages)

  const lastAI = [...messages]
    .reverse()
    .find((m) => m.role === "ai")

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        background: "#222",
        color: "#fff",
        borderRadius: "8px",
      }}
    >
      <h4>Feedback</h4>

      {lastAI ? (
        <p>{lastAI.text}</p>
      ) : (
        <p>Start speaking to get feedback...</p>
      )}
    </div>
  )
}