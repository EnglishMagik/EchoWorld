export function analyzeTone(text) {
  if (text.includes("!")) return "excited";
  if (text.includes("...")) return "uncertain";
  return "neutral";
}