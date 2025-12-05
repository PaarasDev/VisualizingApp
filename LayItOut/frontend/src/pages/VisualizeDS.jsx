import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Visualizer from "../components/Visualizer";
import OperationsMenu from "../components/OperationsMenu";

export default function VisualizeDS() {
  const { dsType } = useParams();
  const location = useLocation();

  const initialInput = location.state?.input || "";

  const [input, setInput] = useState(initialInput);
  const [operation, setOperation] = useState("");
  const [opArgs, setOpArgs] = useState("");

  return (
    <div className="page fade-in">

      <NavBar />

      <div className="hero">
        <div className="hero-title">{dsType} Visualizer</div>
        <div className="hero-subtitle">
          Apply operations and watch the structure update in real-time.
        </div>
      </div>

      <div className="input-row">

        {/* Structure input box */}
        <div>
          <label>Initial Values</label><br />
          <input
            className="input-box"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="10, 20, 30"
          />
        </div>

        {/* Operation selector */}
        <div>
          <label>Operation</label><br />
          <OperationsMenu ds={dsType} setOp={setOperation} />
        </div>

        {/* Operation arguments */}
        <div>
          <label>Arguments</label><br />
          <input
            className="input-box"
            value={opArgs}
            onChange={(e) => setOpArgs(e.target.value)}
            placeholder="index,value or value"
          />
        </div>

        {/* Run button */}
        <button className="btn" onClick={() => setOperation(operation)}>
          Run Operation →
        </button>
      </div>

      <div className="visual">
        <Visualizer
          ds={dsType}
          op={operation}
          input={input}
          opArgs={opArgs}
        />
      </div>
    </div>
  );
}
