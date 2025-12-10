import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import MinHeapVisualizer from "../../components/heap/MinHeapVisualizer";

const operations = ["Insert", "Delete", "Peek", "Clear"];

export default function MinHeap() {
  const [input, setInput] = useState("4,1,7,3");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");
  const [trigger, setTrigger] = useState(0);

  const applyOperation = () => {
    setTrigger(t => t + 1);
  };

  return (
    <DSPageLayout title="Min Heap">
      <DSTitle>Min Heap</DSTitle>

      <div className="input-row" style={{ display: "flex", gap: 10 }}>
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Initial array"
        />

        <select
          className="input-box"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="">Select operation</option>
          {operations.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>

        <input
          className="input-box"
          placeholder="Value / index"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        <button
          style={{
            padding: "8px 14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
          onClick={applyOperation}
        >
          APPLY
        </button>
      </div>

      <MinHeapVisualizer
        input={input}
        op={op}
        opArgs={opArgs}
        trigger={trigger}
      />
    </DSPageLayout>
  );
}
