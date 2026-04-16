import worldState from "./worldState";

export function runScenario(name) {
  worldState.addSessionEvent(`Scenario started: ${name}`);
}