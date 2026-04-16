import Scene from "./components/Scene"
import MicButton from "./components/MicButton"
import TranscriptBox from "./components/TranscriptBox"
import FeedbackPanel from "./components/FeedbackPanel"

import "./styles/main.css"

export default function App() {
  return (
    <div className="app">
      <Scene />
      
      <div className="ui-layer">
        <MicButton />
        <TranscriptBox />
        <FeedbackPanel />
      </div>
    </div>
  )
}