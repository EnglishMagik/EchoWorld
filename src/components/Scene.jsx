import { useSessionStore } from "../store/sessionStore"
import worldState from "../engine/worldState"
import { useState, useEffect } from "react"

import LearnerDashboard from "./LearnerDashboard"
import TeachingMindDashboard from "./TeachingMindDashboard"
import SpeechPanel from "./SpeechPanel"
import TeacherPanel from "./TeacherPanel"
import SessionTimeline from "./SessionTimeline"
import ScenarioBuilder from "./ScenarioBuilder"
import ScenarioLibrary from "./ScenarioLibrary"

import { getWorldVisualState } from "../engine/worldVisualEngine"

export default function Scene() {
  const messages = useSessionStore((s) => s.messages || [])
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
  const summary = worldState.getSessionSummary?.() || { totalEvents: 0 }
  const visual = getWorldVisualState()

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: visual.background,
      color: "white",
      fontFamily: "Georgia, serif",
      display: "grid",
      gridTemplateColumns: "280px 1fr 320px",
      gridTemplateRows: "60px 1fr",
      gap: "0",
      boxSizing: "border-box",
    }}>

      {/* ── TOP BAR ── */}
      <div style={{
        gridColumn: "1 / 4",
        background: "rgba(0,0,0,0.5)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "32px",
        fontSize: "15px",
      }}>
        <strong style={{ fontSize: "18px", letterSpacing: "2px" }}>⬡ ECHOWORLD</strong>
        <span>Mood: {worldState.mood || "calm"}</span>
        <span>Scene: {worldState.currentScene || "safe_room"}</span>
        <span>Session: {summary.totalEvents || 0}</span>
      </div>

      {/* ── LEFT PANEL ── */}
      <div style={{
        gridColumn: "1",
        gridRow: "2",
        background: "rgba(0,0,0,0.35)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 16px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>
        {/* Learner Stats */}
        <div>
          <div style={sectionTitle}>📊 Learner Dashboard</div>
          <div style={statRow}>
            <span style={statLabel}>Level</span>
            <span style={statVal}>{worldState.user?.level || 1}</span>
          </div>
          <div style={statRow}>
            <span style={statLabel}>XP</span>
            <span style={statVal}>{worldState.user?.xp || 0}</span>
          </div>
          <div style={statRow}>
            <span style={statLabel}>Mood</span>
            <span style={statVal}>{worldState.mood || "calm"}</span>
          </div>
          <div style={statRow}>
            <span style={statLabel}>Scene</span>
            <span style={statVal}>{worldState.currentScene || "default"}</span>
          </div>
          <div style={statRow}>
            <span style={statLabel}>Teacher</span>
            <span style={statVal}>{worldState.teacherMode ? "ON" : "OFF"}</span>
          </div>
        </div>

        <div style={divider} />

        {/* Recent Activity */}
        <div>
          <div style={sectionTitle}>⚡ Recent Activity</div>
          <LearnerDashboard />
        </div>

        <div style={divider} />

        {/* Scenario Library */}
        <div>
          <div style={sectionTitle}>📚 Scenario Library</div>
          <ScenarioLibrary />
        </div>
      </div>

      {/* ── CENTER ── */}
      <div style={{
        gridColumn: "2",
        gridRow: "2",
        padding: "32px 40px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}>

        {/* Page title */}
        <h1 style={{
          fontSize: "28px",
          fontWeight: "400",
          letterSpacing: "1px",
          margin: "0",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "16px",
        }}>
          Learning Session
        </h1>

        {/* Active scenario display */}
        {worldState.scenarioSystem?.current ? (
          <div style={{
            background: "rgba(129,140,248,0.12)",
            border: "1px solid rgba(129,140,248,0.3)",
            borderRadius: "12px",
            padding: "20px 24px",
          }}>
            <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Active Scenario</div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
              {worldState.scenarioSystem.current.title}
            </div>
            <div style={{ opacity: 0.8, lineHeight: "1.6" }}>
              {worldState.scenarioSystem.current.description}
            </div>
            {worldState.scenarioSystem.current.goal && (
              <div style={{ marginTop: "12px", color: "#34d399", fontSize: "14px" }}>
                🎯 {worldState.scenarioSystem.current.goal}
              </div>
            )}
          </div>
        ) : (
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px dashed rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "20px 24px",
            opacity: 0.6,
            fontSize: "15px",
          }}>
            No scenario loaded yet — create one below or select from the library
          </div>
        )}

        {/* Last message */}
        {lastMessage && (
          <div style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "20px 24px",
          }}>
            <strong style={{ opacity: 0.6, fontSize: "13px" }}>
              {lastMessage.role === "user" ? "You said:" : "AI replied:"}
            </strong>
            <p style={{ margin: "8px 0 0", fontSize: "17px", lineHeight: "1.6" }}>
              {lastMessage.text}
            </p>
          </div>
        )}

        {/* Scenario Builder — FRONT AND CENTER */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "28px",
        }}>
          <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>
            🌱 Scenario Builder
          </div>
          <div style={{ fontSize: "13px", opacity: 0.6, marginBottom: "18px" }}>
            Type any topic to generate a live AI learning scenario
          </div>
          <ScenarioBuilder />
        </div>

        {/* Speech Panel */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "24px",
        }}>
          <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>
            🎤 Speech
          </div>
          <SpeechPanel />
        </div>

        {/* Session Timeline */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "24px",
        }}>
          <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>
            🕐 Session Timeline
          </div>
          <SessionTimeline />
        </div>

      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{
        gridColumn: "3",
        gridRow: "2",
        background: "rgba(0,0,0,0.35)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 16px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>

        {/* Teaching Mind */}
        <div>
          <div style={sectionTitle}>🧠 Teaching Mind</div>
          <TeachingMindDashboard />
        </div>

        <div style={divider} />

        {/* Teacher Panel */}
        <div>
          <div style={sectionTitle}>🎛️ Teacher Mode</div>
          <TeacherPanel />
        </div>

      </div>

    </div>
  )
}

// ── shared mini styles ──
const sectionTitle = {
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  opacity: 0.5,
  marginBottom: "12px",
  fontFamily: "monospace",
}

const statRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px 0",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  fontSize: "14px",
}

const statLabel = {
  opacity: 0.6,
}

const statVal = {
  fontWeight: "600",
  color: "#a5f3fc",
}

const divider = {
  height: "1px",
  background: "rgba(255,255,255,0.08)",
}
