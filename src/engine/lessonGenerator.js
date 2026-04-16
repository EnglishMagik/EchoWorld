import { worldState } from "./worldState"
import { sendToAI } from "./aiService"
import { adaptLesson } from "./lessonAdapter"

/**
 * 📚 Generate + adapt Teaching Studio lesson
 */
export async function generateLessonFromSession() {
  const history = worldState.getHistory()
  const profile = worldState.getLearnerProfile()
  const topWords = worldState.getTopWords()

  const userInputs = history
    .filter((e) => e.type === "user_speech")
    .map((e) => e.payload.text)
    .slice(-10)

  const prompt = `
You are an expert English teacher.

Create a structured Teaching Studio lesson.

Learner input:
${userInputs.join("\n")}

Profile:
- Avg words: ${Math.round(profile.avgWordCount)}
- Strong responses: ${profile.strongResponses}
- Short responses: ${profile.shortResponses}

Vocabulary:
${topWords.join(", ")}

STRUCTURE:
PAGE 1: Title + Reading
PAGE 2: Dialogue
PAGE 3: Vocabulary
PAGE 4: Grammar
PAGE 5: Practice
PAGE 6: Roleplay
`

  try {
    let lesson = await sendToAI({
      input: prompt,
      scene: "lesson_generator",
      history: [],
    })

    // 🧬 STEP 47 — ADAPT THE LESSON
    lesson = adaptLesson(lesson)

    worldState.logEvent("adaptive_lesson_generated", {
      lesson,
      level: worldState.getAdaptiveState().level,
    })

    return lesson
  } catch (err) {
    console.error("Lesson generation error:", err)
    return "Failed to generate lesson"
  }
}