import React, { useState } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import PriorityQueueVisualizer from "../../components/queue/PriorityQueueVisualizer";

const operations = ["Enqueue", "Dequeue", "Clear"];

export default function PriorityQueue() {
  const [input, setInput] = useState("A:1,B:4,C:2");

  // This is the value used to initialize the PQ visuals
  const [initialInputList, setInitialInputList] = useState([]);

  const [op, setOp] = useState("");
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");

  const [applyOp, setApplyOp] = useState("");
  const [applyArgs, setApplyArgs] = useState("");
  const [trigger, setTrigger] = useState(0);

  const parseInput = (str) => {
    if (!str) return [];
    return str.split(",").map(item => {
      const [val, p] = item.split(":");
      return { value: val.trim(), priority: Number(p) };
    });
  };

  const handleApply = () => {
    // If user pressed Apply while selecting no operation => means initialize PQ from input
    if (op === "") {
      setInitialInputList(parseInput(input));
      return;
    }

    if (op === "Enqueue") {
      setApplyArgs([value, priority]);
    } else {
      setApplyArgs([]);
    }

    setApplyOp(op);
    setTrigger(t => t + 1);
  };

  return (
    <DSPageLayout title="Priority Queue">
      <DSTitle>Priority Queue</DSTitle>

      <div className="input-row">

        {/* INITIAL INPUT FIELD */}
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Format: A:1,B:4,C:2"
        />

        <select
          className="input-box"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="">Initialize / Reset Queue</option>
          {operations.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <input
          className="input-box"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <input
          className="input-box"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />

        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>

      <PriorityQueueVisualizer
        initialInput={initialInputList}
        op={applyOp}
        args={applyArgs}
        trigger={trigger}
      />
    </DSPageLayout>
  );
}
