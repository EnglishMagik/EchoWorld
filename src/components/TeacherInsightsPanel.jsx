import { useState } from "react"
import { generateTeacherInsights } from "../engine/teacherInsights"

export default function TeacherInsightsPanel() {
  const [data, setData] = useState(null)

  const handleGenerate = () => {
    const result = generateTeacherInsights()
    setData(result)
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        left: "20px",
        width: "300px",
        padding: "12px",
        background: "rgba(0,0,0,0.85)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
        maxHeight: "420px",
        overflowY: "auto",
      }}
    >
      <h4>🧠 Teacher Insights</h4>

      <button
        onClick={handleGenerate}
        style={{
          width: "100%",
          padding: "6px",
          marginTop: "8px",
          borderRadius: "6px",
        }}
      >
        Generate Insights
      </button>

      {data && (
        <>
          <div style={{ marginTop: "10px", opacity: 0.8 }}>
            <p>Level: {data.summary.level}</p>
            <p>Interactions: {data.summary.interactions}</p>
            <p>Pattern: {data.summary.strongestPattern}</p>
          </div>

          <div style={{ marginTop: "10px" }}>
            {data.insights.map((item, i) => (
              <p key={i} style={{ marginBottom: "6px" }}>
                • {item}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}