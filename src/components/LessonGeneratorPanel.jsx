import { useState } from "react"
import { generateLessonFromSession } from "../engine/lessonGenerator"

export default function LessonGeneratorPanel() {
  const [loading, setLoading] = useState(false)
  const [lesson, setLesson] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setCopied(false)

    const result = await generateLessonFromSession()

    setLesson(result)
    setLoading(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(lesson)
      setCopied(true)
    } catch (err) {
      console.error("Copy failed", err)
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        right: "20px",
        width: "300px",
        padding: "12px",
        background: "rgba(0,0,0,0.8)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
        maxHeight: "450px",
        overflowY: "auto",
      }}
    >
      <h4>📚 TS Lesson Generator</h4>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "none",
          marginTop: "8px",
        }}
      >
        {loading ? "Generating..." : "Generate Lesson"}
      </button>

      {lesson && (
        <>
          <button
            onClick={copyToClipboard}
            style={{
              marginTop: "8px",
              width: "100%",
              padding: "6px",
              borderRadius: "6px",
              border: "none",
            }}
          >
            {copied ? "Copied!" : "Copy Lesson"}
          </button>

          <div
            style={{
              marginTop: "10px",
              whiteSpace: "pre-wrap",
              fontSize: "11px",
              opacity: 0.9,
            }}
          >
            {lesson}
          </div>
        </>
      )}
    </div>
  )
}