import React, { useEffect, useState } from "react";
import * as HP from "../../ds/heap";

function parse(str) {
  if (!str) return [];
  return str
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n));
}

export default function MinHeapVisualizer({ input, op, opArgs, trigger }) {
  const [heap, setHeap] = useState([]);
  const [peekValue, setPeekValue] = useState(null);

  // Build heap from initial input
  useEffect(() => {
    setHeap(HP.createMin(parse(input)));
  }, [input]);

  // Apply operations
  useEffect(() => {
    if (!op) return;

    const args = opArgs.trim() === "" ? [] : parse(opArgs);

    if (op === "Peek") {
      if (heap.length > 0) setPeekValue(heap[0]);
      else setPeekValue("Empty");
      return;
    }

    setPeekValue(null);
    const newHeap = HP.applyMin(heap, op, args);
    setHeap(newHeap);
  }, [trigger]);

  // ------------------ TREE LAYOUT ------------------
  const nodeSize = 50;
  const verticalGap = 90;
  const horizontalGap = 120;

  const getPos = (i) => {
    const level = Math.floor(Math.log2(i + 1));
    const indexInLevel = i - (2 ** level - 1);
    const nodesInLevel = 2 ** level;
    const totalWidth = (nodesInLevel - 1) * horizontalGap;

    return {
      x: indexInLevel * horizontalGap - totalWidth / 2,
      y: level * verticalGap,
    };
  };

  const positions = heap.map((_, i) => getPos(i));

  const minX = Math.min(...positions.map((p) => p.x));
  const maxX = Math.max(...positions.map((p) => p.x));

  const width = maxX - minX + nodeSize + 200;
  const height = (Math.floor(Math.log2(heap.length)) + 2) * verticalGap;

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          width: "100%",
          height: "600px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          padding: "20px",
          overflow: "auto",
        }}
      >
        {/* ARRAY */}
        <h3 style={{ color: "white" }}>Array</h3>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 10 }}>
          {heap.map((v, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "4px",
                }}
              >
                {i}
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 6,
                  minWidth: 40,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* PEEK OUTPUT */}
        {peekValue !== null && (
          <div
            style={{
              marginTop: 20,
              padding: "10px 14px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: 6,
              color: "white",
              fontWeight: "bold",
              width: "fit-content",
            }}
          >
            Peek Output: {peekValue}
          </div>
        )}

        {/* TREE LABEL */}
        <h3 style={{ color: "white", marginTop: 20 }}>Tree</h3>

        {/* TREE CANVAS */}
        <div
          style={{
            position: "relative",
            width: width,
            height: height,
            margin: "0 auto",
          }}
        >
          {/* LINES */}
          <svg
            width={width}
            height={height}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            {heap.map((v, i) => {
              const left = 2 * i + 1;
              const right = 2 * i + 2;
              const parent = positions[i];

              const px = parent.x - minX + nodeSize / 2;
              const py = parent.y + nodeSize / 2;

              return (
                <React.Fragment key={"line-" + i}>
                  {left < heap.length && (() => {
                    const child = positions[left];
                    return (
                      <line
                        x1={px}
                        y1={py}
                        x2={child.x - minX + nodeSize / 2}
                        y2={child.y + nodeSize / 2}
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  })()}

                  {right < heap.length && (() => {
                    const child = positions[right];
                    return (
                      <line
                        x1={px}
                        y1={py}
                        x2={child.x - minX + nodeSize / 2}
                        y2={child.y + nodeSize / 2}
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  })()}
                </React.Fragment>
              );
            })}
          </svg>

          {/* NODES */}
          {heap.map((v, i) => {
            const { x, y } = positions[i];

            return (
              <div
                key={"node-" + i}
                style={{
                  position: "absolute",
                  left: x - minX,
                  top: y,
                  width: nodeSize,
                  height: nodeSize,
                  borderRadius: "50%",
                  background: "#ef4444", // red-ish for minheap distinction
                  color: "white",
                  border: "3px solid white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {v}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
