import { worldState } from "../engine/worldState"

export default function LearnerDashboard() {
  const profile = worldState.getLearnerProfile()
  const topWords = worldState.getTopWords()

  return (
    <div
      style={{
        position: "absolute",
        right: "20px",
        bottom: "20px",
        width: "260px",
        padding: "12px",
        background: "rgba(0,0,0,0.7)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
      }}
    >
      <h4>📊 Learner Profile</h4>

      <p>Interactions: {profile.totalInteractions}</p>
      <p>Avg Words: {Math.round(profile.avgWordCount)}</p>
      <p>Longest: {profile.longestResponse}</p>

      <p>
        Strong: {profile.strongResponses} | Short:{" "}
        {profile.shortResponses}
      </p>

      <div style={{ marginTop: "10px" }}>
        <strong>Top Words:</strong>
        {topWords.length === 0 && (
          <p style={{ opacity: 0.6 }}>No data yet</p>
        )}

        {topWords.map((w, i) => (
          <span
            key={i}
            style={{
              marginRight: "6px",
              opacity: 0.8,
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}