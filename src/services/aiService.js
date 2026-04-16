import { getTeacherPersona } from "./teacherPersona"

export async function sendToAI({
  input,
  scene,
  mood,
  teacherMode,
  userLevel,
  speechReport,
  teacherMemory,
  learnerProfile,
  topWords,
  adaptiveLevel,
  history,
}) {
  const persona = getTeacherPersona()

  const systemPrompt = `
You are an English teaching AI inside EchoWorld.

You have MULTIPLE TEACHER PERSONAS:

🎓 coach:
- supportive
- balanced correction
- encourages learning

📏 examiner:
- strict
- tests knowledge
- asks follow-up questions
- minimal hints

🧡 support:
- very gentle
- simple language
- lots of scaffolding

⚡ activator:
- fast-paced
- pushes fluency
- encourages long responses

CURRENT PERSONA: ${persona}

ADAPTIVE LEVEL: ${adaptiveLevel}

SCENE: ${scene}
MOOD: ${mood}
USER LEVEL: ${userLevel}

INSTRUCTIONS:
- Stay fully in persona
- Respond naturally
- Include a short "Tip" at the end
`

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input },
        ],
        temperature: 0.7,
      }),
    })

    const data = await res.json()

    return data.choices?.[0]?.message?.content || "No response"
  } catch (err) {
    console.error("AI error:", err)
    return "Error generating response"
  }
}