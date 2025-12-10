import React, { useEffect, useState } from "react";
import * as GR from "../../ds/graph";

function parse(str) {
  return str.split(",").map(s => s.trim()).filter(Boolean);
}

export default function WeightedGraphVisualizer({ input, op, opArgs, trigger }) {
  const [graph, setGraph] = useState({ nodes: [], edges: [], traversal: [] });

  useEffect(() => {
    setGraph(GR.create(parse(input), "weighted"));
  }, [input]);

  useEffect(() => {
    if (!op) return;
    setGraph(g => GR.apply(g, "weighted", op, opArgs));
  }, [trigger]);

  return (
    <svg width={800} height={450}>

      {/* Edges + weights */}
      {graph.edges.map((e, i) => {
        const a = graph.nodes.find(n => n.id === e.from);
        const b = graph.nodes.find(n => n.id === e.to);
        if (!a || !b) return null;
        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="white" />
            <text
              x={(a.x + b.x) / 2}
              y={(a.y + b.y) / 2}
              fill="yellow"
              textAnchor="middle"
            >
              {e.weight}
            </text>
          </g>
        );
      })}

      {/* Traversal order */}
      {graph.traversal.map((id, idx) => {
        const node = graph.nodes.find(n => n.id === id);
        if (!node) return null;
        return (
          <text
            key={"trav-" + id}
            x={node.x}
            y={node.y - 25}
            fill="yellow"
            textAnchor="middle"
          >
            {idx + 1}
          </text>
        );
      })}

      {/* Nodes */}
      {graph.nodes.map(n => (
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
