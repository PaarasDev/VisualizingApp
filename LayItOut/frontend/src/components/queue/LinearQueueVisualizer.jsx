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

export default function LinearQueueVisualizer({ input, op, opArgs, trigger }) {
  const [queue, setQueue] = useState([]);
  const [peekValue, setPeekValue] = useState(null);

  // Build queue from input
  useEffect(() => {
    setQueue(Q.create(parse(input)));
    setPeekValue(null);
  }, [input]);

  // Respond to Apply button
  useEffect(() => {
    if (!op) return;

    // Handle Peek locally (queue.js does NOT support Peek)
    if (op === "Peek") {
      if (queue.length > 0) setPeekValue(queue[0]);
      else setPeekValue("Empty Queue");
      return;
    }

    // Clear
    if (op === "Clear") {
      setQueue([]);
      setPeekValue(null);
      return;
    }

    // Enqueue / Dequeue supported by queue.js
    setQueue((prev) => Q.apply(prev, "linear", op, parse(opArgs)));
    setPeekValue(null);

  }, [trigger]); // <-- important: run on every Apply click

  return (
    <div>
      {/* Peek output */}
      {peekValue !== null && (
        <div
          style={{
            marginBottom: 12,
            padding: "8px 12px",
            background: "rgba(255,255,255,0.12)",
            borderRadius: 6,
            width: "fit-content",
          }}
        >
          Front Element: <b>{peekValue}</b>
        </div>
      )}

      {/* FRONT pointer */}
      <div style={{ marginBottom: 10, fontSize: 18 }}>
        <b>FRONT →</b>
      </div>

      <div
        style={{
          display: "flex",
          gap: 15,
          overflowX: "auto",
          paddingBottom: 10,
        }}
      >
        {queue.map((v, i) => (
          <div
            key={i}
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.12)",
              minWidth: 60,
              textAlign: "center",
            }}
          >
            {v}
          </div>
        ))}

        <div style={{ fontSize: 18, marginLeft: 10 }}>← REAR</div>
      </div>
    </div>
  );
}
