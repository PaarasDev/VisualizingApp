import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import BinaryTreeVisualizer from "../../components/tree/BinaryTreeVisualizer";

const operations = [
  "Insert",
  "Clear",
  "BFS",
  "DFS Preorder",
  "DFS Inorder",
  "DFS Postorder"
];


export default function BinaryTree() {
  const [input, setInput] = useState("1,2,3,4");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  const [applyOp, setApplyOp] = useState("");
  const [applyArgs, setApplyArgs] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const handleApply = () => {
    setApplyOp(op);
    setApplyArgs(opArgs);
    setTrigger((t) => t + 1);
  };

  return (
    <DSPageLayout title="Binary Tree">
      <DSTitle>Binary Tree (Left → Right Insertion)</DSTitle>

      <div className="input-row">
        {/* Initial tree input */}
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="1,2,3,4"
        />

        {/* Operation */}
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

        {/* Insert value */}
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

      <BinaryTreeVisualizer
        input={input}
        op={applyOp}
        opArgs={applyArgs}
        trigger={trigger}
      />
    </DSPageLayout>
  );
}
