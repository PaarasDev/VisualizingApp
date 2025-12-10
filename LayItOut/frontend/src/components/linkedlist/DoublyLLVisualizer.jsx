import React, { useEffect, useState } from "react";
import * as LL from "../../ds/linkedlist";

// Parse helper
function parse(t) {
  if (!t) return [];
  return t
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (isNaN(Number(s)) ? s : Number(s)));
}

export default function DoublyLLVisualizer({ input, op, opArgs, applyTrigger }) {
  const [head, setHead] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [resultText, setResultText] = useState("");

  // Rebuild from input
  useEffect(() => {
    const list = LL.create(parse(input), "doubly");
    rebuild(list);
    setResultText("");
  }, [input]);

  // Apply operation on trigger
  useEffect(() => {
    if (!op) return;

    // RESET states
    setHighlightIndex(-1);
    setResultText("");

    if (op === "Search") {
      runSearch();
      return;
    }

    const newList = LL.apply(head, "doubly", op, parse(opArgs));
    rebuild(newList);
  }, [applyTrigger]);

  // Build node positions
  function rebuild(h) {
    const arr = [];
    let t = h,
      i = 0;
    while (t) {
      arr.push({
        id: i,
        val: t.val,
        x: 80 + i * 180,
        y: 60,
      });
      t = t.next;
      i++;
    }
    setNodes(arr);
    setHead(h);
  }

  // SEARCH ANIMATION
  async function runSearch() {
    const target = opArgs?.trim();
    let t = head;
    let idx = 0;

    while (t) {
      setHighlightIndex(idx);
      await new Promise((res) => setTimeout(res, 500)); // animation delay

      if (String(t.val) === target) {
        setResultText(`Found at index ${idx}`);
        setHighlightIndex(idx);
        return;
      }

      t = t.next;
      idx++;
    }

    setResultText("Not found");
    setHighlightIndex(-1);
  }

  return (
    <>
      {/* RESULT TEXT */}
      {resultText && (
        <div
          style={{
            color: "white",
            marginBottom: "10px",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          🔍 {resultText}
        </div>
      )}

      {/* SVG VISUAL */}
      <svg width={nodes.length * 200 + 100} height={150}>
        {nodes.map((n, i) => (
          <g key={i}>
            <rect
              x={n.x}
              y={30}
              width={140}
              height={50}
              rx={8}
              fill={
                highlightIndex === i
                  ? "rgba(108,160,255,0.6)"
                  : "rgba(255,255,255,0.12)"
              }
            />
            <text x={n.x + 70} y={60} fill="white" textAnchor="middle">
              {n.val}
            </text>

            {/* next → */}
            {i < nodes.length - 1 && (
              <line
                x1={n.x + 140}
                y1={55}
                x2={nodes[i + 1].x}
                y2={55}
                stroke="white"
                strokeWidth={2}
              />
            )}

            {/* prev ← */}
            {i < nodes.length - 1 && (
              <line
                x1={nodes[i + 1].x}
                y1={65}
                x2={n.x + 140}
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
