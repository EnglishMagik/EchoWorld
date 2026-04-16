// src/services/speechToText.js

export async function speechToText(audioBlob) {
  try {
    // TEMP MOCK VERSION (so system works immediately)

    // In real version, you'd send audioBlob to Whisper / API
    console.log("Received audio blob:", audioBlob)

    // For now we simulate transcription:
    return "Hello, I am practicing English in EchoWorld"
  } catch (err) {
    console.error("speechToText error:", err)
    return ""
  }
}