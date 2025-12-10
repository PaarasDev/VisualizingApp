import React, { useEffect, useState } from "react";
import * as TR from "../../ds/tree";

const parse = (t) =>
  t
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number);

export default function BinaryTreeVisualizer({ input, op, opArgs, trigger }) {
  const [root, setRoot] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [output, setOutput] = useState(""); // BFS / DFS result

  /* -------------------- BUILD TREE FROM INPUT -------------------- */
  useEffect(() => {
    const r = TR.create(parse(input), "Tree");
    layout(r);
    setOutput("");
  }, [input]);

  /* -------------------- APPLY OPERATIONS -------------------- */
  useEffect(() => {
    if (!op) return;

    if (op === "Clear") {
      setRoot(null);
      setNodes([]);
      setOutput("");
      return;
    }

    if (op === "Insert") {
      const v = Number(opArgs);
      const r = TR.apply(root, "Tree", "Insert", [v]);
      layout(r);
      setOutput("");
      return;
    }

    // BFS
    if (op === "BFS") {
      const res = [];
      const q = [];
      if (root) q.push(root);

      while (q.length) {
        const n = q.shift();
        res.push(n.val);
        if (n.left) q.push(n.left);
        if (n.right) q.push(n.right);
      }
      setOutput("BFS: " + res.join(", "));
      return;
    }

    // DFS Preorder
    if (op === "DFS Preorder") {
      const res = [];
      function pre(n) {
        if (!n) return;
        res.push(n.val);
        pre(n.left);
        pre(n.right);
      }
      pre(root);
      setOutput("Preorder: " + res.join(", "));
      return;
    }

    // DFS Inorder
    if (op === "DFS Inorder") {
      const res = [];
      function ino(n) {
        if (!n) return;
        ino(n.left);
        res.push(n.val);
        ino(n.right);
      }
      ino(root);
      setOutput("Inorder: " + res.join(", "));
      return;
    }

    // DFS Postorder
    if (op === "DFS Postorder") {
      const res = [];
      function post(n) {
        if (!n) return;
        post(n.left);
        post(n.right);
        res.push(n.val);
      }
      post(root);
      setOutput("Postorder: " + res.join(", "));
      return;
    }
  }, [trigger]);

  /* -------------------- NODE POSITIONING -------------------- */
  function layout(rootNode) {
    if (!rootNode) {
      setNodes([]);
      setRoot(null);
      return;
    }

    let index = 0;

    function firstWalk(node, depth = 0) {
      if (!node) return;

      node._y = depth * 90;

      if (!node.left && !node.right) {
        node._x = index * 90;
        index += 1;
      } else {
        firstWalk(node.left, depth + 1);
        firstWalk(node.right, depth + 1);

        const lx = node.left ? node.left._x : null;
        const rx = node.right ? node.right._x : null;

        if (lx !== null && rx !== null) node._x = (lx + rx) / 2;
        else if (lx !== null) node._x = lx + 90;
        else if (rx !== null) node._x = rx - 90;
      }
    }

    firstWalk(rootNode);

    // normalize so minX = 0
    let minX = Infinity;
    function findMin(n) {
      if (!n) return;
      minX = Math.min(minX, n._x);
      findMin(n.left);
      findMin(n.right);
    }
    findMin(rootNode);

    const collected = [];
    function collect(n) {
      if (!n) return;
      collected.push({
        node: n,
        x: n._x - minX + 50,
        y: n._y + 50,
      });
      collect(n.left);
      collect(n.right);
    }
    collect(rootNode);

    setRoot(rootNode);
    setNodes(collected);
  }

  /* -------------------- SVG SIZING -------------------- */
  const svgWidth =
    nodes.length > 0 ? Math.max(...nodes.map((n) => n.x)) + 200 : 600;
  const svgHeight =
    nodes.length > 0 ? Math.max(...nodes.map((n) => n.y)) + 200 : 400;

  /* -------------------- RENDER -------------------- */
return (
  <div
    style={{
      marginTop: "40px",
      padding: "20px",
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.05)",
      width: "100%",
      maxHeight: "500px",      // ⭐ Keeps scroll INSIDE the visual box
      overflowX: "auto",
      overflowY: "auto",
      whiteSpace: "nowrap",
      boxSizing: "border-box",
    }}
  >
    {/* Traversal Output */}
    {output && (
      <div
        style={{
          marginBottom: "20px",
          padding: "12px 18px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.12)",
          color: "white",
          fontSize: "1.1rem",
          display: "inline-block"
        }}
      >
        <strong>Output:</strong> {output}
      </div>
    )}

    {/* Fix: Inline-block wrapper to allow SVG expansion */}
    <div
      style={{
        display: "inline-block",
        minWidth: svgWidth + 200,
        minHeight: svgHeight + 200,
        position: "relative",
      }}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        style={{ overflow: "visible", display: "block" }}
      >
        {nodes.map((n, i) => {
          const left = nodes.find((c) => c.node === n.node.left);
          const right = nodes.find((c) => c.node === n.node.right);

          return (
            <g key={i}>
              {left && (
                <line
                  x1={n.x}
                  y1={n.y}
                  x2={left.x}
                  y2={left.y}
                  stroke="white"
                  strokeWidth={1.4}
                />
              )}
              {right && (
                <line
                  x1={n.x}
                  y1={n.y}
                  x2={right.x}
                  y2={right.y}
                  stroke="white"
                  strokeWidth={1.4}
                />
              )}
              <circle cx={n.x} cy={n.y} r={18} fill="rgba(255,255,255,0.12)" />
              <text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize={15}
              >
                {n.node.val}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  </div>
);

}
