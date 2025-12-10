import { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import DoublyLLVisualizer from "../../components/linkedlist/DoublyLLVisualizer";

const operations = [
  "Insert Head",
  "Insert Tail",
  "Delete Head",
  "Delete Tail",
  "Search"
];

export default function DoublyLinkedList() {
  const [input, setInput] = useState("5,10,15");
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
    <DSPageLayout title="Doubly Linked List">
      <DSTitle>Doubly Linked List Visualization</DSTitle>

      <div className="input-row">
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <select className="input-box" value={op} onChange={(e) => setOp(e.target.value)}>
          <option value="">Select Operation</option>
          {operations.map((o) => <option key={o}>{o}</option>)}
        </select>

        <input
          className="input-box"
          placeholder="Args if needed"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        <button className="btn" onClick={applyOperation}>Apply</button>
      </div>

      {resultMsg && (
        <div style={{ marginTop: 10, color: "#38e8c6", fontWeight: 600 }}>
          {resultMsg}
        </div>
      )}

      <div className="visual-box">
        <DoublyLLVisualizer
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
