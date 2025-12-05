import React, { useMemo, useState, useRef } from "react";
import * as Arr from "../ds/array";
import * as LL from "../ds/linkedlist";
import * as ST from "../ds/stack";
import * as Q from "../ds/queue";
import * as TR from "../ds/tree";
import * as HP from "../ds/heap";
import * as GR from "../ds/graph";
import { sleep } from "../utils/animate";

/* ------------------- Utility ------------------- */
function parse(text) {
  if (!text) return [];
  return text
    .split(",")
    .map((s) => s.trim())
    .filter((x) => x !== "")
    .map((x) => (isNaN(Number(x)) ? x : Number(x)));
}

function clonePositions(nodes) {
  return nodes.map((n) => ({ ...n }));
}

/* ------------------- Visualizer ------------------- */
export default function Visualizer({ ds, op, input, opArgs = "", onApply }) {
  const data = useMemo(() => parse(input), [input]);

  const create = () => {
    switch (ds) {
      case "Array": return Arr.create(data);
      case "Linked List": return LL.create(data);
      case "Stack": return ST.create(data);
      case "Queue": return Q.create(data);
      case "Tree": return TR.create(data);
      case "Heap": return HP.create(data);
      case "Graph": return GR.create(data);
      default: return data;
    }
  };

  const [state, setState] = useState(create);
  const [highlights, setHighlights] = useState({ nodes: [], edges: [], indices: [] });
  const [positions, setPositions] = useState(null);
  const pointerRef = useRef({ x: 0, y: 0, visible: false });

  React.useEffect(() => {
    setState(create());
    if (ds === "Graph") computeGraphPositions();
    if (ds === "Tree") computeTreePositions();
    if (ds === "Linked List") computeLinkedListPositions();
    setHighlights({ nodes: [], edges: [], indices: [] });
  }, [ds]);

  /* ------------------------ Position Calculations ------------------------ */

  function computeGraphPositions() {
    const g = GR.create(parse(input));
    setPositions({ type: "graph", nodes: clonePositions(g.nodes), edges: [...g.edges] });
  }

  function computeTreePositions() {
    const root = TR.create(parse(input));
    if (!root) {
      setPositions(null);
      return;
    }

    const levels = [];
    const q = [[root, 0]];
    while (q.length) {
      const [n, lvl] = q.shift();
      if (!levels[lvl]) levels[lvl] = [];
      levels[lvl].push(n);
      if (n.left) q.push([n.left, lvl + 1]);
      if (n.right) q.push([n.right, lvl + 1]);
    }

    const gapX = 120;
    const gapY = 90;
    const nodes = [];

    levels.forEach((row, r) => {
      const totalWidth = (row.length - 1) * gapX;
      row.forEach((n, i) => {
        const x = i * gapX - totalWidth / 2;
        const y = r * gapY;
        nodes.push({ id: `${n.val}_${r}_${i}`, node: n, x, y, val: n.val });
      });
    });

    setPositions({ type: "tree", nodes });
  }

  function computeLinkedListPositions() {
    const head = LL.create(parse(input));
    const nodes = [];
    let cur = head, i = 0;

    while (cur) {
      nodes.push({ id: i, val: cur.val, x: 60 + i * 140, y: 50 });
      cur = cur.next;
      i++;
    }
    setPositions({ type: "linkedlist", nodes });
  }

  /* -------------------- Generic DS Operation -------------------- */
  function genericApply(curState, dsName, opName, args) {
    switch (dsName) {
      case "Array": return Arr.apply(curState, opName, args);
      case "Linked List": return LL.apply(curState, opName, args);
      case "Stack": return ST.apply(curState, opName, args);
      case "Queue": return Q.apply(curState, opName, args);
      case "Tree": return TR.apply(curState, opName, args);
      case "Heap": return HP.apply(curState, opName, args);
      case "Graph": return GR.apply(curState, opName, args);
      default: return curState;
    }
  }

  /* -------------------- Run Operation -------------------- */
  async function runOp() {
    if (!op) return;
    const args = parse(opArgs);

    const next = genericApply(state, ds, op, args);
    setState(next);

    if (ds === "Linked List") computeLinkedListPositions();
    if (ds === "Tree") computeTreePositions();
    if (ds === "Graph") computeGraphPositions();

    onApply?.();
  }

  /* -------------------- Render -------------------- */
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700 }}>{ds} Visualization</div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn"
            onClick={() => {
              setState(create());
              if (ds === "Linked List") computeLinkedListPositions();
              if (ds === "Tree") computeTreePositions();
              if (ds === "Graph") computeGraphPositions();
            }}
          >
            Rebuild
          </button>

          <button className="btn" onClick={runOp}>
            Run: {op || "—"}
          </button>
        </div>
      </div>

      {/* SCROLLABLE CONTAINER */}
      <div className="visual">

        {ds === "Array" && <ArrayView arr={state} highlights={highlights} />}
        {ds === "Linked List" && (
          <LinkedListView head={state} positions={positions} highlights={highlights} />
        )}
        {ds === "Stack" && <StackView stack={state} highlights={highlights} />}
        {ds === "Queue" && <QueueView queue={state} highlights={highlights} />}

        {ds === "Tree" && (
          <>
            <div className="ds-title">Tree Representation</div>
            <TreeView positions={positions} highlights={highlights} />
          </>
        )}

        {ds === "Heap" && (
          <>
            <div className="ds-title">Array Representation</div>
            <ArrayView arr={state} highlights={highlights} />

            <div className="ds-title" style={{ marginTop: 20 }}>
              Heap Tree Representation
            </div>
            <HeapTreeView heap={state} highlights={highlights} />
          </>
        )}

        {ds === "Graph" && <GraphView graph={state} highlights={highlights} />}
      </div>
    </>
  );
}

/* ====================== VIEW COMPONENTS ====================== */
/* ---------------------- Array ---------------------- */
function ArrayView({ arr = [], highlights = {} }) {
  const idxs = highlights.indices || [];

  return (
    <div style={{ display: "flex", gap: 15 }}>
      {arr.map((v, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "10px 15px",
              borderRadius: 8,
              background: idxs.includes(i)
                ? "rgba(96,165,250,0.65)"
                : "rgba(255,255,255,0.10)",
            }}
          >
            {v}
          </div>
          <div className="small">[{i}]</div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------- Linked List ---------------------- */
function LinkedListView({ head, positions, highlights }) {
  if (!positions) return null;

  const idxs = highlights.indices || [];

  return (
    <svg width={positions.nodes.length * 150 + 80} height={140}>
      {positions.nodes.map((n, i) => {
        const active = idxs.includes(i);

        return (
          <g key={i}>
            <rect
              x={n.x}
              y={20}
              width={100}
              height={40}
              rx={8}
              fill={active ? "rgba(96,165,250,0.6)" : "rgba(255,255,255,0.1)"}
            />
            <text x={n.x + 50} y={45} fill="white" textAnchor="middle">
              {n.val}
            </text>

            {i < positions.nodes.length - 1 && (
              <line
                x1={n.x + 100}
                y1={40}
                x2={positions.nodes[i + 1].x}
                y2={40}
                stroke="white"
                strokeOpacity={0.6}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------------- Stack ---------------------- */
function StackView({ stack, highlights }) {
  const idxs = highlights.indices || [];

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse", gap: 10 }}>
      {stack.map((v, i) => (
        <div
          key={i}
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            background: idxs.includes(i)
              ? "rgba(96,165,250,0.6)"
              : "rgba(255,255,255,0.1)",
          }}
        >
          {v}
        </div>
      ))}
    </div>
  );
}

/* ---------------------- Queue ---------------------- */
function QueueView({ queue, highlights }) {
  const idxs = highlights.indices || [];

  return (
    <div style={{ display: "flex", gap: 15 }}>
      {queue.map((v, i) => (
        <div
          key={i}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: idxs.includes(i)
              ? "rgba(96,165,250,0.6)"
              : "rgba(255,255,255,0.1)",
          }}
        >
          {v}
        </div>
      ))}
    </div>
  );
}

/* ---------------------- Tree (Centered) ---------------------- */
function TreeView({ positions, highlights }) {
  if (!positions || !positions.nodes) return <div>Empty</div>;

  const nodes = positions.nodes;
  const highlighted = highlights.nodes || [];

  const xs = nodes.map((n) => n.x);
  const ys = nodes.map((n) => n.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  const svgWidth = Math.max(600, maxX - minX + 300);
  const svgHeight = Math.max(...ys) + 150;

  return (
    <div className="tree-wrapper">
      <svg width={svgWidth} height={svgHeight}>
        {/* edges */}
        {nodes.map((p, i) => {
          const left = nodes.find((n) => n.node === p.node.left);
          const right = nodes.find((n) => n.node === p.node.right);

          return (
            <g key={i}>
              {left && (
                <line
                  x1={p.x - minX + 150}
                  y1={p.y + 20}
                  x2={left.x - minX + 150}
                  y2={left.y + 20}
                  stroke="white"
                  strokeOpacity="0.2"
                />
              )}
              {right && (
                <line
                  x1={p.x - minX + 150}
                  y1={p.y + 20}
                  x2={right.x - minX + 150}
                  y2={right.y + 20}
                  stroke="white"
                  strokeOpacity="0.2"
                />
              )}
            </g>
          );
        })}

        {/* nodes */}
        {nodes.map((p) => (
          <g key={p.id}>
            <rect
              x={p.x - minX + 130}
              y={p.y}
              width={40}
              height={28}
              rx={6}
              fill={
                highlighted.includes(p.id)
                  ? "rgba(96,165,250,0.7)"
                  : "rgba(255,255,255,0.12)"
              }
            />
            <text
              x={p.x - minX + 150}
              y={p.y + 16}
              textAnchor="middle"
              fill="white"
              dominantBaseline="middle"
            >
              {p.val}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------------------- Graph ---------------------- */
function GraphView({ graph, highlights }) {
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];
  const highlightedIds = highlights.nodes || [];

  return (
    <svg width={900} height={450}>
      {edges.map((e, i) => {
        const a = nodes.find((n) => n.id === e.from);
        const b = nodes.find((n) => n.id === e.to);
        if (!a || !b) return null;

        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="white"
            strokeOpacity="0.35"
          />
        );
      })}

      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={22}
            fill={
              highlightedIds.includes(n.id)
                ? "rgba(96,165,250,0.7)"
                : "rgba(255,255,255,0.15)"
            }
          />
          <text
            x={n.x}
            y={n.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------------------- HEAP TREE (Perfect Centered) ---------------------- */
function HeapTreeView({ heap, highlights }) {
  if (!heap || heap.length === 0) return <div>Empty</div>;

  const gapX = 120;
  const gapY = 90;
  const padding = 140;

  const nodes = [];

  for (let i = 0; i < heap.length; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const start = 2 ** level - 1;
    const count = Math.min(2 ** level, heap.length - start);
    const indexInLevel = i - start;

    const x = (indexInLevel - (count - 1) / 2) * gapX;
    const y = level * gapY;

    nodes.push({ id: i, val: heap[i], x, y });
  }

  const xs = nodes.map((n) => n.x);
  const ys = nodes.map((n) => n.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  const svgWidth = Math.max(600, maxX - minX + padding * 2);
  const svgHeight = Math.max(...ys) + 150;

  const highlight = highlights.indices || [];

  return (
    <div className="tree-wrapper">
      <svg width={svgWidth} height={svgHeight}>
        {/* edges */}
        {nodes.map((n) => {
          const left = nodes[2 * n.id + 1];
          const right = nodes[2 * n.id + 2];

          return (
            <g key={`edge-${n.id}`}>
              {left && (
                <line
                  x1={n.x - minX + padding}
                  y1={n.y + 18}
                  x2={left.x - minX + padding}
                  y2={left.y + 18}
                  stroke="white"
                  strokeOpacity="0.25"
                />
              )}
              {right && (
                <line
                  x1={n.x - minX + padding}
                  y1={n.y + 18}
                  x2={right.x - minX + padding}
                  y2={right.y + 18}
                  stroke="white"
                  strokeOpacity="0.25"
                />
              )}
            </g>
          );
        })}

        {/* nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x - minX + padding - 20}
              y={n.y}
              width={40}
              height={28}
              rx={6}
              fill={
                highlight.includes(n.id)
                  ? "rgba(96,165,250,0.7)"
                  : "rgba(255,255,255,0.1)"
              }
            />
            <text
              x={n.x - minX + padding}
              y={n.y + 16}
              textAnchor="middle"
              fill="white"
              dominantBaseline="middle"
            >
              {n.val}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
