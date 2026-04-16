import worldState from "../engine/worldState"

export default function SpeechPanel() {
  const history = worldState.getHistory()

  // find last speech event
  const lastSpeech = [...history]
    .reverse()
    .find((h) => h.type === "user_speech")

  if (!lastSpeech?.payload?.speechReport) return null

  const report = lastSpeech.payload.speechReport

  const getColor = (confidence) => {
    switch (confidence) {
      case "low":
        return "#ff4d4d"
      case "medium":
        return "#ffcc00"
      case "high":
        return "#4dff88"
      default:
        return "#ffffff"
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        width: "220px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
      }}
    >
      <h4>🎤 Speech Feedback</h4>

      <div style={{ marginTop: "10px" }}>
        <p>
          Confidence:{" "}
          <span style={{ color: getColor(report.confidence) }}>
            {report.confidence}
          </span>
        </p>

        <p>Words: {report.wordCount}</p>

        <p style={{ marginTop: "8px", opacity: 0.8 }}>
          {report.feedback}
        </p>
      </div>

      {/* SIMPLE VISUAL BAR */}
      <div
        style={{
          marginTop: "10px",
          height: "6px",
          width: "100%",
          background: "#222",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width:
              report.confidence === "low"
                ? "30%"
                : report.confidence === "medium"
                ? "60%"
                : "100%",
            background: getColor(report.confidence),
            transition: "all 0.4s ease",
          }}
        />
      </div>
    </div>
  )
}