import worldState from "../engine/worldState"

export default function LearnerDashboard() {
  const profile = worldState.user || { level: 1, xp: 0 }

  const history = worldState.getHistory?.() || []

  const lastEvents = history.slice(-5).reverse()

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "260px",
        maxHeight: "50vh",
        overflowY: "auto",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        color: "white",
        padding: "12px",
        fontSize: "12px",
        borderTopRightRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "10px" }}>
        <strong>📊 Learner Dashboard</strong>
      </div>

      {/* PROFILE */}
      <div style={{ marginBottom: "10px", opacity: 0.9 }}>
        <div>Level: {profile.level || 1}</div>
        <div>XP: {profile.xp || 0}</div>
      </div>

      {/* SYSTEM STATE SNAPSHOT */}
      <div style={{ marginBottom: "10px", opacity: 0.8 }}>
        <div>Mood: {worldState.mood || "calm"}</div>
        <div>Scene: {worldState.currentScene || "default"}</div>
        <div>Teacher: {worldState.teacherMode ? "ON" : "OFF"}</div>
      </div>

      {/* RECENT ACTIVITY */}
      <div>
        <strong>Recent Activity</strong>
        <div style={{ marginTop: "6px" }}>
          {lastEvents.length === 0 && (
            <div style={{ opacity: 0.5 }}>No activity yet</div>
          )}

          {lastEvents.map((event, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "6px",
                padding: "6px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "6px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{event.type}</div>
              <div style={{ opacity: 0.7 }}>
                {typeof event.data === "object"
                  ? JSON.stringify(event.data)
                  : String(event.data)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}