import { useWorldReactivity } from "../hooks/useWorldReactivity"

export default function AdaptivePanel({ children }) {
  const mood = useWorldReactivity("mood")
  const trust = useWorldReactivity("trust")

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.06)",
        opacity: trust === "low" ? 0.7 : 1,
        transform: mood === "active" ? "scale(1.02)" : "scale(1)",
        transition: "all 0.4s ease",
      }}
    >
      {children}
    </div>
  )
}