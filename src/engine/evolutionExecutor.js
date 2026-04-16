import worldState from "../engine/worldState"
import { getEvolutionGuardrails } from "./evolutionGuardrails"

/**
 * ⚙️ EVOLUTION EXECUTION ENGINE
 * Safely applies approved system upgrades in stages
 */

export function runEvolutionExecutionCycle() {
  if (!worldState.evolutionExecution) {
    worldState.evolutionExecution = {
      staged: [],
      active: [],
      rejected: [],
      history: [],
    }
  }

  const exec = worldState.evolutionExecution
  const guardrails = getEvolutionGuardrails()

  if (!guardrails) return exec

  // 🧠 STAGE APPROVED PROPOSALS
  guardrails.approved.forEach((proposal) => {
    const alreadyStaged = exec.staged.find(
      (p) => p.timestamp === proposal.timestamp
    )

    if (!alreadyStaged) {
      exec.staged.push({
        ...proposal,
        status: "staged",
        activationScore: 0,
      })
    }
  })

  // ⚙️ SIMULATE IMPACT (SOFT DEPLOYMENT)
  exec.staged.forEach((item) => {
    const profile = worldState.getLearnerProfile()

    let impact = 0

    // 📊 SIMPLE SIMULATION MODEL
    if (profile.avgWordCount > 8) impact += 1
    if (worldState.teachingMetrics?.averageClarity > 0.6) impact += 1

    item.activationScore += impact

    // 🚀 ACTIVATE IF STABLE POSITIVE SIGNAL
    if (item.activationScore >= 3) {
      exec.active.push({
        ...item,
        status: "active",
        activatedAt: new Date().toISOString(),
      })

      worldState.logEvent("evolution_activated", item)
    }

    // ❌ ROLLBACK CONDITION
    if (item.activationScore < -2) {
      exec.rejected.push({
        ...item,
        status: "rolled_back",
        reason: "negative system impact",
      })

      worldState.logEvent("evolution_rollback", item)
    }
  })

  // 🧹 CLEAN STAGED LIST
  exec.staged = exec.staged.filter(
    (item) => !exec.active.includes(item)
  )

  return exec
}

export function getEvolutionExecutionState() {
  return worldState.evolutionExecution || null
}