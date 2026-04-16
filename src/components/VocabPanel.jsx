import { worldState } from "../engine/worldState"

export default function VocabPanel() {
  const vocab = worldState.getTopVocabulary(8)

  const selected = worldState.getSelectedWordInfo()

  if (!vocab.length) return null

  return (
    <div
      style={{
        position: "absolute",
        right: "20px",
        top: "20px",
        width: "240px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        borderRadius: "10px",
        color: "white",
        fontSize: "12px",
      }}
    >
      <h4>📚 Your Words</h4>

      {vocab.map((item, i) => (
        <div
          key={i}
          onClick={() => worldState.selectWord(item.word)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
            cursor: "pointer",
            opacity: 0.9,
          }}
        >
          <span>{item.word}</span>
          <span style={{ opacity: 0.6 }}>{item.count}</span>
        </div>
      ))}

      {/* 📖 WORD DETAIL PANEL */}
      {selected && (
        <div
          style={{
            marginTop: "10px",
            padding: "8px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "8px",
          }}
        >
          <strong>{selected.word}</strong>
          <p style={{ margin: "5px 0" }}>{selected.meaning}</p>
          <p style={{ opacity: 0.7 }}>{selected.example}</p>
        </div>
      )}
    </div>
  )
}