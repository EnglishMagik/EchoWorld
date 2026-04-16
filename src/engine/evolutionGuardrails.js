import { worldState } from "./worldState"
import { getEvolutionEngineState } from "./autonomousEvolution"

/**
 * 🛡️ EVOLUTION GUARDRAILS SYSTEM
 * Filters unsafe or low-quality system upgrades
 */

export function runEvolutionGuardrails() {
  if (!worldState.evolutionGuardrails) {
    worldState.evolutionGuardrails = {
      approved: [],
      rejected: [],
      riskLog: [],
    }
  }

  const guardrails = worldState.evolutionGuardrails
  const evolution = getEvolutionEngineState()

  if (!evolution || !evolution.proposals) return guardrails

  const safeProposals = []

  evolution.proposals.forEach((proposal) => {
    let risk = 0

    // 🧠 RULE 1: vague ideas = risky
    if (!proposal.idea || proposal.idea.length < 20) {
      risk += 2
    }

    // 🧠 RULE 2: engine modifications = medium risk
    if (proposal.type === "engine_upgrade") {
      risk += 1
    }

    // 🧠 RULE 3: system expansion = higher risk
    if (proposal.type === "system_expansion") {
      risk += 2
    }

    // 🧠 RULE 4: unknown targets = risky
    if (!proposal.target) {
      risk += 3
    }

    const decision = risk >= 3 ? "reject" : "approve"

    const record = {
      ...proposal,
      risk,
      decision,
      timestamp: new Date().toISOString(),
    }

    guardrails.riskLog.push(record)

    if (decision === "approve") {
      safeProposals.push(record)
      guardrails.approved.push(record)
    } else {
      guardrails.rejected.push(record)
    }
  })

  worldState.logEvent("evolution_guardrails", {
    approved: guardrails.approved.length,
    rejected: guardrails.rejected.length,
  })

  return guardrails
}

export function getEvolutionGuardrails() {
  return worldState.evolutionGuardrails || null
}