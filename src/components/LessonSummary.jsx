import worldState from "../engine/worldState"
import { useSessionStore } from "../store/sessionStore"

export default function LessonSummary() {
  const messages = useSessionStore((s) => s.messages)

  const lesson = worldState.getLessonState()

  if (!lesson.complete || !lesson.summary) return null

  const restartLesson = () => {
    worldState.resetLesson()
    window.location.reload()
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.92)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "30px",
        zIndex: 999,
      }}
    >
      <h1>📊 Lesson Complete</h1>

      <p style={{ opacity: 0.7 }}>
        Scene: {lesson.summary.scene}
      </p>

      <p style={{ opacity: 0.7 }}>
        Level: {lesson.summary.level}
      </p>

      <p style={{ opacity: 0.7 }}>
        Total Steps: {lesson.summary.totalSteps}
      </p>

      <div
        style={{
          marginTop: "20px",
          maxWidth: "600px",
          textAlign: "left",
          background: "rgba(255,255,255,0.05)",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <h3>🧠 What happened</h3>

        {lesson.summary.keyEvents.map((e, i) => (
          <p key={i} style={{ fontSize: "12px", opacity: 0.8 }}>
            {e.type} — {JSON.stringify(e.payload)}
          </p>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={restartLesson}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          🔄 Start New Lesson
        </button>
      </div>
    </div>
  )
}