// src/pages/stack/BasicStack.jsx
import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import ArrayStackVisualizer from "../../components/stack/ArrayStackVisualizer";

const operations = ["Push", "Pop", "Peek", "Clear"];

export default function BasicStack() {
  const [input, setInput] = useState("1,2,3");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  const [applyOp, setApplyOp] = useState("");
  const [applyArgs, setApplyArgs] = useState("");

  const handleApply = () => {
    setApplyOp(op);
    setApplyArgs(opArgs);
  };

  return (
    <DSPageLayout title="Array Stack">
      <DSTitle>Array-Based Stack</DSTitle>

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
          {operations.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>

        <input
          className="input-box"
          placeholder="Value for push"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>

      <ArrayStackVisualizer
        input={input}
        op={applyOp}
        opArgs={applyArgs}
      />
    </DSPageLayout>
  );
}
