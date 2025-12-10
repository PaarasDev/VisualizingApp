import React, { useState, useEffect } from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import LinkedListStackVisualizer from "../../components/stack/LinkedListStackVisualizer";

const operations = ["Push", "Pop", "Peek", "Clear"];

// Simple Node class (self-contained linked list)
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default function MinStack() {
  const [input, setInput] = useState("5,10,11");
  const [op, setOp] = useState("");
  const [opArgs, setOpArgs] = useState("");

  const [stackHead, setStackHead] = useState(null);

  const [applyOp, setApplyOp] = useState("");
  const [applyArgs, setApplyArgs] = useState("");

  // Build a linked list stack from input like "5,10,11"
  const buildStack = (str) => {
    const values = str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => (isNaN(Number(s)) ? s : Number(s)));

    let head = null;
    for (let i = values.length - 1; i >= 0; i--) {
      const node = new Node(values[i]);
      node.next = head;
      head = node;
    }
    return head;
  };

  // Initialize stack on page load
  useEffect(() => {
    setStackHead(buildStack(input));
  }, []); // <-- important

  const handleApply = () => {
    setApplyOp(op);
    setApplyArgs(opArgs);
  };

  return (
    <DSPageLayout title="LinkedList Stack">
      <DSTitle>Linked-List Based Stack</DSTitle>

      <div className="input-row">
        <input
          className="input-box"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setStackHead(buildStack(e.target.value));
          }}
          placeholder="5,10,11"
        />

        <select
          className="input-box"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="">Select operation</option>
          {operations.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <input
          className="input-box"
          placeholder="Value for push"
          value={opArgs}
          onChange={(e) => setOpArgs(e.target.value)}
        />

        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>

      <LinkedListStackVisualizer
        head={stackHead}
        op={applyOp}
        opArgs={applyArgs}
        setHead={setStackHead}
        NodeClass={Node}
      />
    </DSPageLayout>
  );
}
