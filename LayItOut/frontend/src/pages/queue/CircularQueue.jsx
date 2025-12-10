import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import CircularQueueVisualizer from "../../components/queue/CircularQueueVisualizer";

const operations = ["Enqueue", "Dequeue", "Front", "Clear"];

export default function CircularQueue() {
  const [input, setInput] = useState("10,20,30");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  const [applyOp, setApplyOp] = useState("");
  const [applyArgs, setApplyArgs] = useState("");
  const [trigger, setTrigger] = useState(0);

  const handleApply = () => {
    setApplyOp(op);
    setApplyArgs(opArgs);
    setTrigger(t => t + 1);
  };

  return (
    <DSPageLayout title="Circular Queue">
      <DSTitle>Circular Queue</DSTitle>

      <div className="input-row">
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="10,20,30"
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

      <CircularQueueVisualizer
        input={input}
        op={applyOp}
        opArgs={applyArgs}
        trigger={trigger}
      />
    </DSPageLayout>
  );
}
