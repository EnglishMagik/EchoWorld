import { sendToAI } from "../services/aiService"
import worldState from "../engine/worldState"

/**
 * 🌱 EchoWorld Scenario Writer
 * Turns a topic into a structured interactive learning world
 */

export async function generateScenario(topic) {
  if (!topic) return null

  const prompt = `
You are an expert English learning designer.

Create an interactive roleplay scenario for English learners.

Topic: ${topic}

Return ONLY valid JSON in this format:

{
  "title": "short title",
  "description": "short situation description",
  "vocab": ["word1", "word2", "word3", "word4", "word5"],
  "prompts": [
    "question or speaking prompt 1",
    "question or speaking prompt 2",
    "question or speaking prompt 3",
    "question or speaking prompt 4",
    "question or speaking prompt 5"
  ],
  "goal": "what the learner should achieve"
}

Make it practical, human, and suitable for spoken English practice.
`

  try {
    const response = await sendToAI({
      input: prompt,
      scene: "scenario_generator",
      history: [],
    })

    let scenario

    try {
      scenario = JSON.parse(response)
    } catch (err) {
      // fallback if AI does not return clean JSON
      scenario = {
        title: topic,
        description: response,
        vocab: [],
        prompts: [],
        goal: "Practice spoken English naturally",
      }
    }

    const id = topic.toLowerCase().replace(/\s+/g, "_")

    worldState.generatedScenarios[id] = scenario
    worldState.setScenario(id)

    worldState.logEvent("scenario_generated", {
      topic,
      id,
    })

    return scenario
  } catch (err) {
    console.error("Scenario generation error:", err)
    return null
  }
}