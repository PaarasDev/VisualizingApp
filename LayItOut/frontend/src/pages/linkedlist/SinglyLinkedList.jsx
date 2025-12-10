// src/pages/linkedlist/SinglyLinkedList.jsx
import { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import SinglyLLVisualizer from "../../components/linkedlist/SinglyLLVisualizer";

const operations = [
  "Insert Head",
  "Insert Tail",
  "Insert At",
  "Delete At",
  "Search",
  "Reverse"
];

export default function SinglyLinkedList() {
  const [input, setInput] = useState("10,20,30");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  const [applyTrigger, setApplyTrigger] = useState(0);
  const [resultMsg, setResultMsg] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const applyOperation = () => {
    setResultMsg("");
    setHighlightIndex(-1);
    setApplyTrigger((x) => x + 1);
  };

  return (
    <DSPageLayout title="Singly Linked List">
      <DSTitle>Singly Linked List Visualization</DSTitle>

      {/* INPUT AREA */}
      <div className="input-row">
        <input
          className="input-box"
          placeholder="10,20,30"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <select className="input-box" value={op} onChange={(e) => setOp(e.target.value)}>
          <option value="">Select Operation</option>
          {operations.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <input
          className="input-box"
          placeholder="Args (index or value)"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        <button className="btn" onClick={applyOperation}>
          Apply
        </button>
      </div>

      {/* RESULT MESSAGE */}
      {resultMsg && (
        <div style={{ marginTop: 10, color: "#38e8c6", fontWeight: "600" }}>
          {resultMsg}
        </div>
      )}

      {/* VISUALIZER */}
      <div className="visual-box">
        <SinglyLLVisualizer
          input={input}
          op={op}
          opArgs={opArgs}
          applyTrigger={applyTrigger}
          setResultMsg={setResultMsg}
          highlightIndex={highlightIndex}
          setHighlightIndex={setHighlightIndex}
        />
      </div>
    </DSPageLayout>
  );
}
