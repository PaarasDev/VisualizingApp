import React, { useEffect, useState } from "react";
import * as TR from "../../ds/tree";

function parse(t) {
  if (!t) return [];
  return t.split(",").map((s) => Number(s.trim())).filter((x) => !isNaN(x));
}

export default function AVLTreeVisualizer({ input, op, opArgs, trigger }) {
  const [root, setRoot] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [output, setOutput] = useState(null);

  /* ---------------- INITIAL BUILD ---------------- */
  useEffect(() => {
    const r = TR.create(parse(input), "AVL");
    layout(r);
    setOutput(null);
  }, [input]);

  /* ---------------- APPLY OPERATIONS ---------------- */
  useEffect(() => {
    if (!op) return;

    // Clear
    if (op === "Clear") {
      setRoot(null);
      setNodes([]);
      setOutput(null);
      return;
    }

    // Search
    if (op === "Search") {
      const val = Number(opArgs);
      const found = TR.apply(root, "AVL", "Search", [val]);
      setOutput(found ? `Found: ${val}` : `Not Found`);
      return;
    }

    // Inorder Traversal
    if (op === "Inorder") {
      const res = [];
      (function inorder(n) {
        if (!n) return;
        inorder(n.left);
        res.push(n.val);
        inorder(n.right);
      })(root);
      setOutput("Inorder: " + res.join(" → "));
      return;
    }

    // Insert / Delete
    const r = TR.apply(root, "AVL", op, [Number(opArgs)]);
    layout(r);
    setOutput(null);
  }, [trigger]);

  /* ---------------- NODE LAYOUT (SYMMETRIC) ---------------- */
  function layout(root) {
    if (!root) {
      setNodes([]);
      setRoot(null);
      return;
    }

    let index = 0;

    function firstWalk(node, depth = 0) {
      if (!node) return;

      node._y = depth * 90;

      if (!node.left && !node.right) {
        node._x = index * 80;
        index++;
      } else {
        firstWalk(node.left, depth + 1);
        firstWalk(node.right, depth + 1);

        const lx = node.left ? node.left._x : null;
        const rx = node.right ? node.right._x : null;

        if (lx !== null && rx !== null) node._x = (lx + rx) / 2;
        else if (lx !== null) node._x = lx + 60;
        else node._x = rx - 60;
      }
    }

    firstWalk(root);

    // normalize X so leftmost is not negative
    let minX = Infinity;
    (function findMin(node) {
      if (!node) return;
      minX = Math.min(minX, node._x);
      findMin(node.left);
      findMin(node.right);
    })(root);

    const collected = [];
    (function collect(node) {
      if (!node) return;
      collected.push({
        node,
        x: node._x - minX + 50,
        y: node._y,
      });
      collect(node.left);
      collect(node.right);
    })(root);

    setNodes(collected);
    setRoot(root);
  }

  /* ---------------- RENDER ---------------- */
  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.05)",
        width: "100%",
        height: "500px",
        overflow: "auto", // ← scroll both ways
      }}
    >
      {/* OUTPUT BOX */}
      {output && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.15)",
            color: "white",
            fontSize: "1.1rem",
            width: "fit-content",
          }}
        >
          {output}
        </div>
      )}

      <svg width={2000} height={1500}>
        {nodes.map((n, i) => {
          const left = nodes.find((t) => t.node === n.node.left);
          const right = nodes.find((t) => t.node === n.node.right);

          const cx = n.x + 300;
          const cy = n.y + 40;

          return (
            <g key={i}>
              {left && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={left.x + 300}
                  y2={left.y + 40}
                  stroke="white"
                />
              )}
              {right && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={right.x + 300}
                  y2={right.y + 40}
                  stroke="white"
                />
              )}

              <circle
                cx={cx}
                cy={cy}
                r={18}
                fill="rgba(255,255,255,0.12)"
                stroke="white"
              />
              <text
                x={cx}
                y={cy + 5}
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
  );
}
