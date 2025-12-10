// src/pages/stack/BST.jsx
import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import BSTVisualizer from "../../components/tree/BSTVisualizer";

const operations = ["Insert", "Delete", "Search", "Inorder", "Preorder", "Postorder"];

export default function BST() {
  const [input, setInput] = useState("50,30,70");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  // Apply-button controlled states
  const [applyOp, setApplyOp] = useState("");
  const [applyArgs, setApplyArgs] = useState("");
  const [trigger, setTrigger] = useState(0);

  const handleApply = () => {
    setApplyOp(op);
    setApplyArgs(opArgs);
    setTrigger(t => t + 1);
  };

  return (
    <DSPageLayout title="Binary Search Tree">
      <DSTitle>BST</DSTitle>

      <div className="input-row">
        {/* Initial input */}
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="50,30,70"
        />

        {/* Operation */}
        <select
          className="input-box"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="">Select operation</option>
          {operations.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>

        {/* Operation argument */}
        <input
          className="input-box"
          placeholder="Value"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        {/* APPLY BUTTON */}
        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>

      <BSTVisualizer
        input={input}
        op={applyOp}
        opArgs={applyArgs}
        trigger={trigger}
      />
    </DSPageLayout>
  );
}
