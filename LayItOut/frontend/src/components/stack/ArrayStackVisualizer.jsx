import React, { useEffect, useState } from "react";
import * as ST from "../../ds/stack";

function parse(t) {
  if (!t) return [];
  return t
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => (isNaN(Number(s)) ? s : Number(s)));
}

export default function ArrayStackVisualizer({ input, op, opArgs }) {
  const [stack, setStack] = useState([]);
  const [peekValue, setPeekValue] = useState(null);

  // initialize stack
  useEffect(() => {
    setStack(ST.create(parse(input), "array"));
    setPeekValue(null); // reset peek display when input changes
  }, [input]);

  // apply operation
  useEffect(() => {
    if (!op) return;

    if (op === "Peek") {
      setPeekValue(
        stack.length > 0 ? stack[stack.length - 1] : "Empty Stack"
      );
      return; // Prevent modifying stack
    }

    setStack(prev => ST.apply(prev, "array", op, parse(opArgs)));
    setPeekValue(null); // clear peek result when other ops run
  }, [op, opArgs]);

  return (
    <div>
      {/* PEEK OUTPUT */}
      {peekValue !== null && (
        <div
          style={{
            marginBottom: 10,
            padding: "8px 12px",
            background: "rgba(255,255,255,0.15)",
            width: "fit-content",
            borderRadius: 6,
            fontSize: 16
          }}
        >
          Top Element: <b>{peekValue}</b>
        </div>
      )}

      {/* STACK VISUAL */}
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: 10,
          maxHeight: "300px",
          overflowY: "auto",
          paddingRight: 6
        }}
      >
        {stack.map((v, i) => (
          <div
            key={i}
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.12)",
              minWidth: 80,
              textAlign: "center",
              fontSize: 18
            }}
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
