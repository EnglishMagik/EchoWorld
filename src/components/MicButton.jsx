// src/components/MicButton.jsx

import { useState } from "react"
import { runInteraction } from "../engine/runInteraction"

export default function MicButton() {
  const [recording, setRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      const chunks = []

      recorder.ondataavailable = (e) => {
        chunks.push(e.data)
      }

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" })

        // 🔥 THIS is the core EchoWorld moment
        const result = await runInteraction(audioBlob)

        console.log("Interaction result:", result)
      }

      recorder.start()
      setMediaRecorder(recorder)
      setRecording(true)
    } catch (err) {
      console.error("Mic error:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setRecording(false)
    }
  }

  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      style={{
        padding: "12px 20px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background: recording ? "#ff4d4d" : "#4caf50",
        color: "white",
        fontSize: "16px",
      }}
    >
      {recording ? "Stop" : "Speak"}
    </button>
  )
}