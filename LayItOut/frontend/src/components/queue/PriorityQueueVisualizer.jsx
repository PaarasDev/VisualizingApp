import React, { useEffect, useState } from "react";
import * as Q from "../../ds/queue";

export default function PriorityQueueVisualizer({ initialInput, op, args, trigger }) {
  const [pq, setPQ] = useState([]);

  // Initialize PQ ONLY when initialInput changes (NOT during typing)
  useEffect(() => {
    setPQ(
      initialInput.map(item => ({
        value: item.value,
        priority: item.priority
      }))
    );
  }, [initialInput]);

  // Apply operations
  useEffect(() => {
    if (!op) return;

    if (op === "Enqueue") {
      const [val, pri] = args;
      setPQ(prev => Q.apply(prev, "priority", "Enqueue", [val, pri]));
      return;
    }

    if (op === "Dequeue") {
      setPQ(prev => Q.apply(prev, "priority", "Dequeue", []));
      return;
    }

    if (op === "Clear") {
      setPQ([]);
      return;
    }

  }, [trigger]);

  return (
    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
      {pq.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "12px 18px",
            background: "rgba(255,255,255,0.12)",
            borderRadius: 8,
            border: "2px solid rgba(255,255,255,0.3)",
            minWidth: 70,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 18 }}>{item.value}</div>
          <div style={{ fontSize: 14, opacity: 0.7 }}>
            Priority: {item.priority}
          </div>
        </div>
      ))}
    </div>
  );
}
