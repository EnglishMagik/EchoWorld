export function speak(text, voice = {}) {
  if (!window.speechSynthesis) return

  const utterance = new SpeechSynthesisUtterance(text)

  // 🎙️ BASE SETTINGS
  utterance.rate = voice.energy === "fast" ? 1.1 : 0.95
  utterance.pitch = voice.tone === "friendly" ? 1.2 : 1.0
  utterance.volume = 1

  // 🧠 OPTIONAL: pick a voice if available
  const voices = window.speechSynthesis.getVoices()

  if (voice.style?.includes("professional")) {
    utterance.voice =
      voices.find((v) => v.lang.includes("en") && v.name.includes("Google")) ||
      voices[0]
  }

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}