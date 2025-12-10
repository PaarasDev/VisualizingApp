import React, { useState, useEffect } from "react";
import * as TR from "../../ds/tree";

function parse(t) {
  if (!t) return [];
  return t.split(",").map(s => s.trim()).filter(Boolean).map(Number);
}

export default function BSTVisualizer({ input, op, opArgs, trigger }) {
  const [root, setRoot] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [output, setOutput] = useState(null);

  // Initial BST creation
  useEffect(() => {
    const r = TR.create(parse(input), "BST");
    setOutput(null);
    layout(r);
  }, [input]);

  // Apply operations only on Apply button press
  useEffect(() => {
    if (!op) return;

    let newRoot = root;
    const arg = Number(opArgs);

    setOutput(null);

    if (op === "Insert") {
      newRoot = TR.apply(root, "BST", "Insert", [arg]);
    }
    else if (op === "Delete") {
      newRoot = TR.apply(root, "BST", "Delete", [arg]);
    }
    else if (op === "Search") {
      const found = TR.apply(root, "BST", "Search", [arg]);
      setOutput(found ? `${arg} found` : `${arg} not found`);
    }
    else if (op === "Inorder") {
      const arr = [];
      (function inorder(n) { if (!n) return; inorder(n.left); arr.push(n.val); inorder(n.right); })(root);
      setOutput("Inorder: " + arr.join(", "));
    }
    else if (op === "Preorder") {
      const arr = [];
      (function pre(n) { if (!n) return; arr.push(n.val); pre(n.left); pre(n.right); })(root);
      setOutput("Preorder: " + arr.join(", "));
    }
    else if (op === "Postorder") {
      const arr = [];
      (function post(n) { if (!n) return; post(n.left); post(n.right); arr.push(n.val); })(root);
      setOutput("Postorder: " + arr.join(", "));
    }

    layout(newRoot);
  }, [trigger]);

  // --- TREE LAYOUT ENGINE (Same style as BinaryTree visualizer) ---
  function layout(r) {
    setRoot(r);
    if (!r) {
      setNodes([]);
      return;
    }

    let index = 0;

    function firstWalk(node, depth = 0) {
      if (!node) return;

      node._y = depth * 80;

      if (!node.left && !node.right) {
        node._x = index * 60;
        index += 1;
      } else {
        firstWalk(node.left, depth + 1);
        firstWalk(node.right, depth + 1);

        const leftX = node.left ? node.left._x : null;
        const rightX = node.right ? node.right._x : null;

        if (leftX !== null && rightX !== null)
          node._x = (leftX + rightX) / 2;
        else if (leftX !== null)
          node._x = leftX + 40;
        else if (rightX !== null)
          node._x = rightX - 40;
      }
    }

    firstWalk(r);

    // Normalize minimum x
    let minX = Infinity;
    (function findMin(n) {
      if (!n) return;
      minX = Math.min(minX, n._x);
      findMin(n.left);
      findMin(n.right);
    })(r);

    const out = [];
    (function collect(n) {
      if (!n) return;
      out.push({
        node: n,
        x: n._x - minX + 50,
        y: n._y,
      });
      collect(n.left);
      collect(n.right);
    })(r);

    setNodes(out);
  }

  return (
    <div style={{
      marginTop: "30px",
      padding: "20px",
      background: "rgba(255,255,255,0.05)",
      borderRadius: "10px",
      height: "450px",
      overflow: "auto"
    }}>

      {output && (
        <div
          style={{
            marginBottom: "15px",
            padding: "10px 14px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.12)",
            width: "fit-content"
          }}
        >
          {output}
        </div>
      )}

      <svg width={1500} height={800}>
        {nodes.map((n, i) => {
          const cx = n.x + 200;
          const cy = n.y + 20;

          const left = nodes.find(t => t.node === n.node.left);
          const right = nodes.find(t => t.node === n.node.right);

          return (
            <g key={i}>
              {left && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={left.x + 200}
                  y2={left.y + 20}
                  stroke="white"
                />
              )}

              {right && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={right.x + 200}
                  y2={right.y + 20}
                  stroke="white"
                />
              )}

              <circle cx={cx} cy={cy} r={18} fill="rgba(255,255,255,0.12)" />
              <text x={cx} y={cy + 5} textAnchor="middle" fill="white" fontSize={15}>
                {n.node.val}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
