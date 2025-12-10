import React, { useEffect, useState } from "react";
import * as LL from "../../ds/linkedlist";

function parse(t) {
  return t
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (isNaN(Number(s)) ? s : Number(s)));
}

export default function CircularLLVisualizer({ input, op, opArgs, applyTrigger }) {
  const [head, setHead] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [searchIndex, setSearchIndex] = useState(-1);
  const [searchResult, setSearchResult] = useState("");

  /* ------------------ INITIAL BUILD ------------------ */
  useEffect(() => {
    const list = LL.create(parse(input), "circular");
    rebuild(list);
    setSearchIndex(-1);
    setSearchResult("");
  }, [input]);

  /* ------------------ REBUILD POSITIONS ------------------ */
  function rebuild(h) {
    if (!h) {
      setNodes([]);
      return;
    }

    const arr = [];
    let t = h,
      i = 0;

    do {
      arr.push({ id: i, val: t.val });
      t = t.next;
      i++;
    } while (t !== h);

    positionNodes(arr);
    setHead(h);
  }

  /* ------------------ CIRCLE NODE POSITIONING ------------------ */
  function positionNodes(arr) {
    const count = arr.length;

    const baseRadius = 140;
    const dynamicRadius = baseRadius + count * 14;

    const centerX = dynamicRadius + 80;
    const centerY = dynamicRadius + 80;

    const placed = arr.map((n, i) => {
      const angle = (2 * Math.PI * i) / count;
      return {
        ...n,
        x: centerX + dynamicRadius * Math.cos(angle),
        y: centerY + dynamicRadius * Math.sin(angle),
        angle
      };
    });

    setNodes(placed);
  }

  /* ------------------ HANDLE APPLY BUTTON ------------------ */
  useEffect(() => {
    if (!op) return;

    if (op === "Search") {
      runSearch();
      return;
    }

    const updated = LL.apply(head, "circular", op, parse(opArgs));
    rebuild(updated);

    setSearchIndex(-1);
    setSearchResult("");
  }, [applyTrigger]);

  /* ------------------ SEARCH ANIMATION ------------------ */
  function runSearch() {
    if (!head) return;

    const target = parse(opArgs)[0];

    if (target === undefined) {
      setSearchResult("Enter a value to search.");
      return;
    }

    let arr = [];
    let t = head;
    let idx = 0;

    do {
      arr.push(t.val);
      t = t.next;
    } while (t !== head);

    let pos = -1;
    let i = 0;

    function step() {
      if (i >= arr.length) {
        setSearchIndex(-1);
        setSearchResult("Not Found");
        return;
      }

      setSearchIndex(i);

      if (arr[i] === target) {
        pos = i;
        setSearchResult(`Found at position: ${i}`);
        return;
      }

      i++;
      setTimeout(step, 650); // animation delay
    }

    step();
  }

  /* ------------------ RENDER HELPERS ------------------ */

  function circlePoint(from, to, r = 28) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    const ux = dx / d;
    const uy = dy / d;

    return {
      x: to.x - ux * r,
      y: to.y - uy * r
    };
  }

  function curvePath(start, end, center) {
    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;

    const dx = mx - center.x;
    const dy = my - center.y;

    const cx = mx + dx * 0.45;
    const cy = my + dy * 0.45;

    return `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
  }

  const maxX = Math.max(...nodes.map((n) => n.x), 400);
  const maxY = Math.max(...nodes.map((n) => n.y), 300);

  const svgWidth = maxX + 100;
  const svgHeight = maxY + 100;

  const center = { x: svgWidth / 2, y: svgHeight / 2 };
  const circleRadius = 28;

  /* ------------------ RENDER ------------------ */
  return (
    <>
      <div
        style={{
          width: "100%",
          maxHeight: "450px",
          overflow: "auto",
          padding: "10px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.05)"
        }}
      >
        <svg width={svgWidth} height={svgHeight}>
          {/* ARROWS */}
          {nodes.map((n, i) => {
            const next = nodes[(i + 1) % nodes.length];
            const start = circlePoint(next, n, circleRadius);
            const end = circlePoint(n, next, circleRadius);

            return (
              <path
                key={`arrow-${i}`}
                d={curvePath(start, end, center)}
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.75"
              />
            );
          })}

          {/* NODES */}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x}
                cy={n.y}
                r={circleRadius}
                fill={
                  searchIndex === i
                    ? "#00eaff" // highlighted during search
                    : "rgba(255,255,255,0.15)"
                }
                stroke={searchIndex === i ? "#00ffff" : "none"}
                strokeWidth="3"
              />

              <text
                x={n.x}
                y={n.y + 4}
                fill="white"
                textAnchor="middle"
                fontSize="16"
                fontWeight="600"
              >
                {n.val}
              </text>

              {/* HEAD LABEL */}
              {i === 0 && (
                <text
                  x={n.x}
                  y={n.y - 40}
                  fill="#00eaff"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                >
                  HEAD
                </text>
              )}

              {/* TAIL LABEL */}
              {i === nodes.length - 1 && (
                <text
                  x={n.x}
                  y={n.y + 50}
                  fill="#ff7af0"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                >
                  TAIL
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* SEARCH RESULT BOX */}
      {op === "Search" && (
        <div
          style={{
            marginTop: "15px",
            padding: "12px 18px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.1)",
            width: "fit-content",
            fontSize: "16px",
            fontWeight: "600"
          }}
        >
          🔍 {searchResult}
        </div>
      )}
    </>
  );
}
