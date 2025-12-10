import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import WeightedGraphVisualizer from "../../components/graph/WeightedGraphVisualizer";

const operations = [
  "Add Node",
  "Remove Node",
  "Add Edge",
  "Remove Edge",
  "BFS",
  "DFS",
  "Randomize",
  "Clear"
];

export default function WeightedGraph() {
  const [input, setInput] = useState("A,B,C");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");
  const [trigger, setTrigger] = useState(0);

  const applyOp = () => setTrigger(t => t + 1);

  return (
    <DSPageLayout title="Weighted Graph">
      <DSTitle>Weighted Graph</DSTitle>

      <div className="input-row" style={{ display: "flex", gap: 10 }}>
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
          placeholder="Args: from,to,weight"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        <button
          className="apply-btn"
          onClick={applyOp}
        >
          APPLY
        </button>
      </div>

      <WeightedGraphVisualizer
        input={input}
        op={op}
        opArgs={opArgs}
        trigger={trigger}
      />
    </DSPageLayout>
  );
}
