import React, { useEffect, useState } from "react";
import { create, applyWithFeedback } from "../../ds/linkedlist";

function parse(text) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (isNaN(Number(s)) ? s : Number(s)));
}

export default function SinglyLLVisualizer({ input, op, opArgs, applyTrigger }) {
  const [head, setHead] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [message, setMessage] = useState("");

  // INITIAL BUILD
  useEffect(() => {
    const arr = parse(input);
    const h = create(arr, "singly");
    rebuild(h);
    setHead(h);
  }, [input]);

  // APPLY OPERATION (fires ONLY when Apply button is clicked)
  useEffect(() => {
    if (!applyTrigger) return;
    if (!head || !op) return;

    const args = parse(opArgs);
    const result = applyWithFeedback(head, "singly", op, args);

    setMessage(result.message);
    rebuild(result.updated);
    setHead(result.updated);

  }, [applyTrigger]);

  function rebuild(h) {
    let cur = h;
    let arr = [];
    let i = 0;

    while (cur) {
      arr.push({ id: i, val: cur.val, x: 60 + i * 150, y: 60 });
      cur = cur.next;
      i++;
    }

    setNodes(arr);
  }

  return (
    <>
      {message && (
        <div style={{ marginBottom: 10, color: "lightgreen" }}>{message}</div>
      )}

      <svg width={nodes.length * 170 + 150} height={160}>
        {nodes.map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={40} width={120} height={50} rx={8} fill="rgba(255,255,255,0.12)" />
            <text x={n.x + 60} y={70} fill="white" textAnchor="middle">{n.val}</text>

            {i < nodes.length - 1 && (
              <line
                x1={n.x + 120}
                y1={65}
                x2={nodes[i + 1].x}
                y2={65}
                stroke="white"
                strokeWidth={2}
              />
            )}
          </g>
        ))}
      </svg>
    </>
  );
}
