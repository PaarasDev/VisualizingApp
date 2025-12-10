import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import ArrayVisualizer from "../../components/array/ArrayVisualizer";
import OperationsMenu from "../../components/OperationsMenu";

export default function Array() {
  const [params] = useSearchParams();
  const data = params.get("data") || "10,20,30";

  const [input, setInput] = useState(data);
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  // NEW state to trigger operation only when "Apply" is pressed
  const [applyTrigger, setApplyTrigger] = useState(0);

  return (
    <DSPageLayout title="Array — Visualize">
      <DSTitle>Array Visualization</DSTitle>

      {/* Matching Linked List style row */}
      <div className="input-row">
        {/* Input array values */}
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Operation dropdown */}
        <OperationsMenu ds="Array" setOp={setOp} />

        {/* Operation arguments */}
        <input
          className="input-box"
          placeholder="Args (e.g., index or value)"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        {/* NEW APPLY BUTTON */}
        <button
          className="btn"
          style={{
            padding: "10px 20px",
            background: "#4f46e5",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setApplyTrigger((prev) => prev + 1)}
        >
          Apply
        </button>
      </div>

      {/* Visualizer receives the trigger */}
      <ArrayVisualizer
        input={input}
        op={op}
        opArgs={opArgs}
        applyTrigger={applyTrigger}
      />
    </DSPageLayout>
  );
}
