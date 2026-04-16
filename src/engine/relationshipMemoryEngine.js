import worldState from "../engine/worldState"

/**
 * 🤝 RELATIONSHIP MEMORY ENGINE
 */

export function updateRelationshipMemory(emotion) {
  if (!worldState.relationship) {
    worldState.relationship = {
      emotionalHistory: [],
      dominantEmotion: "neutral",
    }
  }

  const rel = worldState.relationship

  rel.emotionalHistory.push(emotion)

  const counts = {}

  rel.emotionalHistory.forEach((e) => {
    counts[e] = (counts[e] || 0) + 1
  })

  rel.dominantEmotion = Object.entries(counts).sort(
    (a, b) => b[1] - a[1]
  )[0][0]

  worldState.logEvent("relationship_update", rel)

  return rel
}