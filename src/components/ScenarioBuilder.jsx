import { useState } from "react"
import { generateScenario } from "../engine/scenarioWriter"
import worldState from "../engine/worldState"

export default function ScenarioBuilder() {
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const createScenario = async () => {
    if (!topic.trim()) return

    setLoading(true)

    try {
      const scenario = await generateScenario(topic)

      if (scenario) {
        const id = topic.toLowerCase().replace(/\s+/g, "_")

        worldState.setScenario(id)

        setResult(scenario)
      }
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "260px",
        padding: "12px",
        background: "rgba(0,0,0,0.7)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
      }}
    >
      <h4>🌱 Scenario Builder</h4>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. airport delay"
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "8px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      <button
        onClick={createScenario}
        disabled={loading}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Create Scenario"}
      </button>

      {result && (
        <div style={{ marginTop: "10px", opacity: 0.8 }}>
          <strong>Latest Scenario:</strong>
          <p>{result.title || result.name}</p>
        </div>
      )}
    </div>
  )
}