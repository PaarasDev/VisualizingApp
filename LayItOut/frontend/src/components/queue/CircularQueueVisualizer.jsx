import React, { useEffect, useState } from "react";
import * as Q from "../../ds/queue";

function parse(t) {
  if (!t) return [];
  return t
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (isNaN(Number(s)) ? s : Number(s)));
}

export default function CircularQueueVisualizer({ input, op, opArgs, trigger }) {
  const [state, setState] = useState({ arr: [], head: 0, size: 0 });
  const [frontValue, setFrontValue] = useState(null);

  // Initialize circular queue
  useEffect(() => {
    const created = Q.create(parse(input), "circular");
    setState(created);
    setFrontValue(null);
  }, [input]);

  // Apply operation when Apply button is clicked
  useEffect(() => {
    if (!op) return;

    // FRONT (peek)
    if (op === "Front") {
      if (state.size > 0) setFrontValue(state.arr[state.head]);
      else setFrontValue("Empty Queue");
      return;
    }

    // Clear
    if (op === "Clear") {
      setState({ arr: [], head: 0, size: 0 });
      setFrontValue(null);
      return;
    }

    // Enqueue / Dequeue
    setState((prev) => Q.apply(prev, "circular", op, parse(opArgs)));
    setFrontValue(null);
  }, [trigger]);

  const { arr, head, size } = state;

  // Prepare logical order for drawing
  const elements = [];
  for (let i = 0; i < size; i++) {
    const idx = (head + i) % arr.length;
    elements.push({ value: arr[idx], logicalIndex: i });
  }

  // Circle geometry
  const radius = 120;
  const cx = 180;
  const cy = 180;

  return (
    <div style={{ width: 360, height: 360, position: "relative" }}>

      {/* FRONT value output */}
      {frontValue !== null && (
        <div
          style={{
            marginBottom: 12,
            padding: "8px 12px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: 6,
            width: "fit-content",
          }}
        >
          Front Element: <b>{frontValue}</b>
        </div>
      )}

      {/* Circle segments */}
      {elements.map((item, i) => {
        const angle = (2 * Math.PI * i) / size - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        const isFront = i === 0;
        const isRear = i === size - 1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 30,
              top: y - 30,
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: isFront
                ? "rgba(0,255,0,0.3)"
                : "rgba(255,255,255,0.12)",
              border: isRear
                ? "2px solid yellow"
                : "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 18,
              backdropFilter: "blur(4px)",
            }}
          >
            {item.value}
          </div>
        );
      })}

      {/* FRONT label (correctly placed at front node circumference) */}
      {size > 0 && (() => {
        const angle = (2 * Math.PI * 0) / size - Math.PI / 2;
        const labelX = cx + (radius + 40) * Math.cos(angle);
        const labelY = cy + (radius + 40) * Math.sin(angle);

        return (
          <div
            style={{
              position: "absolute",
              left: labelX - 20,
              top: labelY - 10,
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
            }}
          >
            FRONT
          </div>
        );
      })()}

    </div>
  );
}
