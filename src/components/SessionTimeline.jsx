// src/components/SessionTimeline.jsx

import worldState from "../engine/worldState";

export default function SessionTimeline() {
  const events = worldState.getSessionTimeline();

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Session Timeline</h2>

      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul>
          {events.map((item) => (
            <li key={item.id}>
              <strong>{item.timestamp}</strong>
              <div>{item.event}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}