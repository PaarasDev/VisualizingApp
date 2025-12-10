import React, { useEffect, useState } from "react";
import * as GR from "../../ds/graph";

function parse(str) {
  return str.split(",").map((s) => s.trim()).filter(Boolean);
}

export default function DirectedGraphVisualizer({ input, op, opArgs, trigger }) {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  // Initial graph
  useEffect(() => {
    setGraph(GR.create(parse(input), "directed"));
  }, [input]);

  // Apply operations only when APPLY is pressed
  useEffect(() => {
    if (!op) return;
    setGraph((g) => GR.apply(g, "directed", op, opArgs));
  }, [trigger]);

  return (
    <svg width={700} height={450}>
      {/* Directed edges */}
      <defs>
        <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <polygon points="0 0, 10 6, 0 12" fill="white" />
        </marker>
      </defs>

      {graph.edges.map((e, i) => {
        const a = graph.nodes.find((n) => n.id === e.from);
        const b = graph.nodes.find((n) => n.id === e.to);
        if (!a || !b) return null;

        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="white"
            markerEnd="url(#arrow)"
          />
        );
      })}

      {/* Traversal output (highlight nodes) */}
      {(graph.traversal || []).map((id, index) => {
        const node = graph.nodes.find((n) => n.id === id);
        if (!node) return null;

        return (
          <text
            key={"trav-" + id}
            x={node.x}
            y={node.y - 25}
            fill="yellow"
            textAnchor="middle"
            style={{ fontSize: "14px" }}
          >
            {index + 1}
          </text>
        );
      })}

      {/* Nodes */}
      {graph.nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={20} fill="rgba(255,255,255,0.15)" />
          <text x={n.x} y={n.y + 5} fill="white" textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
