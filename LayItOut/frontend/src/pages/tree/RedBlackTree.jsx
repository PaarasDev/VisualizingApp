import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import RedBlackTreeVisualizer from "../../components/tree/RedBlackTreeVisualizer";

const operations = ["Insert", "Search", "Inorder", "Preorder", "Postorder", "Clear"];

function parseInitial(input) {
  if (!input) return [];
  return input.split(",").map(s => s.trim()).filter(Boolean).map(Number);
}

export default function RedBlackTree() {
  const [input, setInput] = useState("8,4,12,2,6,10,14,1,3,5,7,9,11,13,15");
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
    <DSPageLayout title="Red-Black Tree">
      <DSTitle>Red-Black Tree</DSTitle>

      <div className="input-row">
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Comma separated initial nodes"
        />

        <select className="input-box" value={op} onChange={(e) => setOp(e.target.value)}>
          <option value="">Select operation</option>
          {operations.map(o => <option key={o} value={o}>{o}</option>)}
        </select>

        {/* If operation requires a value (Insert/Search), show input */}
        {op === "Insert" || op === "Search" ? (
          <input className="input-box" placeholder="Value" value={opArgs} onChange={(e) => setOpArgs(e.target.value)} />
        ) : (
          <input className="input-box" placeholder="(Not required)" value={opArgs} onChange={(e) => setOpArgs(e.target.value)} />
        )}

        <button className="apply-btn" onClick={handleApply}>Apply</button>
      </div>

      <RedBlackTreeVisualizer
        input={input}
        op={applyOp}
        opArgs={applyArgs}
        trigger={trigger}
      />
    </DSPageLayout>
  );
}
