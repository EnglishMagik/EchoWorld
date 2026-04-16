import Scene from "./components/Scene";
import MicButton from "./components/MicButton";
import TranscriptBox from "./components/TranscriptBox";
import FeedbackPanel from "./components/FeedbackPanel";

import LearnerDashboard from "./components/LearnerDashboard";
import TeachingMindDashboard from "./components/TeachingMindDashboard";
import SpeechPanel from "./components/SpeechPanel";

import "./styles/main.css";

export default function App() {
  return (
    <div className="app-layout">

      {/* TOP BAR */}
      <div className="top-bar">
        <button className="scenario">Scenario Library</button>
        <p>Mood: calm</p>
        <p>Scene: default</p>
        <p>Session: 0</p>
      </div>

      {/* CENTER */}
      <div className="main-area">
        <div>
          <h1>Learning Session</h1>
          <Scene />
          <TranscriptBox />
          <MicButton />
        </div>
      </div>

      {/* LEFT */}
      <div className="left-panel">
        <LearnerDashboard />
      </div>

      {/* RIGHT */}
      <div className="right-panel">
        <TeachingMindDashboard />
        <FeedbackPanel />
        <SpeechPanel />
      </div>

    </div>
  );
}