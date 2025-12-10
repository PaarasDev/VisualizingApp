import { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import CircularLLVisualizer from "../../components/linkedlist/CircularLLVisualizer";

const operations = ["Insert", "Delete", "Search"];

export default function CircularLinkedList() {
  const [input, setInput] = useState("1,2,3");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  // Apply button trigger
  const [applyTrigger, setApplyTrigger] = useState(0);

  function handleApply() {
    setApplyTrigger((t) => t + 1);
  }

  return (
    <DSPageLayout title="Circular Linked List">
      <DSTitle>Circular Linked List Visualization</DSTitle>

      <div className="input-row">
        <input
          className="input-box"
          value={input}
          placeholder="Example: 1,2,3"
          onChange={(e) => setInput(e.target.value)}
        />

        <select
          className="input-box"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="">Select Operation</option>
          {operations.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <input
          className="input-box"
          placeholder="Arg (value/index)"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        <button className="btn" onClick={handleApply}>
          Apply
        </button>
      </div>

      <CircularLLVisualizer
        input={input}
        op={op}
        opArgs={opArgs}
        applyTrigger={applyTrigger}
      />
    </DSPageLayout>
  );
}
