import worldState from "../engine/worldState"

export default function AchievementPanel() {
  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        background: "#0b0f1a",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        maxHeight: "160px",
        overflowY: "auto",
      }}
    >
      <h3>🏆 Achievements</h3>

      {worldState.achievements.length === 0 && (
        <p style={{ opacity: 0.6 }}>No achievements yet...</p>
      )}

      {worldState.achievements.map((a, i) => (
        <div
          key={i}
          style={{
            padding: "6px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          ✨ {a}
        </div>
      ))}
    </div>
  )
}