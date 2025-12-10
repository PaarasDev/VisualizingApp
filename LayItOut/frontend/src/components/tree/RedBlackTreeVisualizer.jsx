import React, { useEffect, useState } from "react";
import * as TR from "../../ds/tree";

function parse(input) {
  if (!input) return [];
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number);
}

export default function RedBlackTreeVisualizer({ input, op, opArgs, trigger }) {
  const [root, setRoot] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [output, setOutput] = useState(null);

  // initial build from input string
  useEffect(() => {
    const r = TR.create(parse(input), "RBT");
    setRoot(r);
    buildNodes(r);
    setOutput(null);
  }, [input]);

  // apply on trigger (Apply button)
  useEffect(() => {
    if (!op) return;

    // SEARCH
    if (op === "Search") {
      const val = Number(opArgs);
      const found = TR.apply(root, "RBT", "Search", [val]);
      setOutput(found ? `Found ${val}` : "Not Found");
      return;
    }

    // TRAVERSALS
    if (op === "Inorder" || op === "Preorder" || op === "Postorder") {
      const arr = TR.apply(root, "RBT", op, []);
      setOutput(`${op}: [ ${arr.join(", ")} ]`);
      return;
    }

    // CLEAR
    if (op === "Clear") {
      setRoot(null);
      setNodes([]);
      setOutput("Cleared Tree");
      return;
    }

    // INSERT
    if (op === "Insert") {
      const val = Number(opArgs);
      const r = TR.apply(root, "RBT", "Insert", [val]);
      setRoot(r);
      buildNodes(r);
      setOutput(null);
      return;
    }
  }, [trigger]); // triggered by Apply button

  // build node array with positions for rendering
  function buildNodes(r) {
    if (!r) {
      setNodes([]);
      return;
    }

    // assign x positions by firstwalk (tidy-ish)
    let index = 0;
    function firstWalk(node, depth = 0) {
      if (!node) return;
      node._y = depth * 90;
      if (!node.left && !node.right) {
        node._x = index * 70;
        index++;
      } else {
        firstWalk(node.left, depth + 1);
        firstWalk(node.right, depth + 1);
        const lx = node.left ? node.left._x : null;
        const rx = node.right ? node.right._x : null;
        if (lx !== null && rx !== null) node._x = (lx + rx) / 2;
        else if (lx !== null) node._x = lx + 50;
        else if (rx !== null) node._x = rx - 50;
      }
    }
    firstWalk(r);

    // normalize minX
    let minX = Infinity;
    (function findMin(node) {
      if (!node) return;
      minX = Math.min(minX, node._x);
      findMin(node.left);
      findMin(node.right);
    })(r);

    const out = [];
    (function collect(node) {
      if (!node) return;
      out.push({
        node,
        val: node.val,
        color: node.color,
        x: node._x - minX + 60,
        y: node._y,
      });
      collect(node.left);
      collect(node.right);
    })(r);

    setNodes(out);
  }

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        height: "480px",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "12px",
        overflow: "auto",
        position: "relative",
      }}
    >
      {output && (
        <div
          style={{
            marginBottom: 12,
            padding: "8px 12px",
            background: "rgba(255,255,255,0.12)",
            borderRadius: 6,
            display: "inline-block",
            color: "white",
          }}
        >
          <strong>{output}</strong>
        </div>
      )}

      <svg width={Math.max(800, nodes.reduce((s, n) => Math.max(s, n.x + 200), 0))}
           height={Math.max(400, nodes.reduce((s, n) => Math.max(s, n.y + 60), 0))}>
        {nodes.map((n, i) => {
          const left = nodes.find(t => t.node === n.node.left);
          const right = nodes.find(t => t.node === n.node.right);

          const cx = n.x + 150;
          const cy = n.y + 30;

          return (
            <g key={i}>
              {left && <line x1={cx} y1={cy} x2={left.x + 150} y2={left.y + 30} stroke="white" />}
              {right && <line x1={cx} y1={cy} x2={right.x + 150} y2={right.y + 30} stroke="white" />}

              <circle cx={cx} cy={cy} r={20} fill={n.color === "red" ? "red" : "black"} stroke="white" strokeWidth={1.5} />
              <text x={cx} y={cy + 6} textAnchor="middle" fill="white" fontSize={14}>{n.val}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
