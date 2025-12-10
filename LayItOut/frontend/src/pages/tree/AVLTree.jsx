import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import AVLTreeVisualizer from "../../components/tree/AVLTreeVisualizer";

const operations = ["Insert", "Delete", "Search", "Inorder", "Clear"];

export default function AVLTree() {
  const [input, setInput] = useState("30,20,40");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  const [applyOp, setApplyOp] = useState("");
  const [applyArgs, setApplyArgs] = useState("");
  const [trigger, setTrigger] = useState(0);

  const handleApply = () => {
    setApplyOp(op);
    setApplyArgs(opArgs);
    setTrigger((t) => t + 1);
  };

  return (
    <DSPageLayout title="AVL Tree">
      <DSTitle>AVL Tree</DSTitle>

      <div className="input-row">
        {/* build tree from initial input */}
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="30,20,40"
        />

        {/* operation selector */}
        <select
          className="input-box"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="">Select operation</option>
          {operations.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        {/* value for insert/search/delete */}
        <input
          className="input-box"
          placeholder="Value"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        {/* Apply button */}
        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>

      <AVLTreeVisualizer
        input={input}
        op={applyOp}
        opArgs={applyArgs}
        trigger={trigger}
      />
    </DSPageLayout>
  );
}
