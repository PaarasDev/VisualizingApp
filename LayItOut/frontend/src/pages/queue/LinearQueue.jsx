import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import LinearQueueVisualizer from "../../components/queue/LinearQueueVisualizer";

const operations = ["Enqueue", "Dequeue", "Peek", "Clear"];

export default function LinearQueue() {
  const [input, setInput] = useState("1,2,3");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  // The trigger ensures every Apply click is detected
  const [applyTrigger, setApplyTrigger] = useState(0);

  const handleApply = () => {
    setApplyTrigger((t) => t + 1); // <--- This forces visualizer effect to run
  };

  return (
    <DSPageLayout title="Linear Queue">
      <DSTitle>Linear Queue</DSTitle>

      <div className="input-row">
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="1,2,3"
        />

        <select
          className="input-box"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="">Select operation</option>
          {operations.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <input
          className="input-box"
          placeholder="Value for enqueue"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>

      <LinearQueueVisualizer
        input={input}
        op={op}
        opArgs={opArgs}
        trigger={applyTrigger}
      />
    </DSPageLayout>
  );
}
