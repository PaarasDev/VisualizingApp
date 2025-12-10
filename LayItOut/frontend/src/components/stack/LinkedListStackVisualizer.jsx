import React, { useEffect, useState } from "react";

export default function LinkedListStackVisualizer({
  head,
  op,
  opArgs,
  setHead,
  NodeClass,
}) {
  const [peekValue, setPeekValue] = useState(null);

  useEffect(() => {
    if (!op) return;

    // PUSH
    if (op === "Push") {
      const value = isNaN(Number(opArgs)) ? opArgs : Number(opArgs);
      const newNode = new NodeClass(value);

      // If empty stack, newNode becomes the head
      if (head === null) {
        setHead(newNode);
      } else {
        newNode.next = head;
        setHead(newNode);
      }

      setPeekValue(null);
      return;
    }

    // POP
    if (op === "Pop") {
      if (head) setHead(head.next);
      setPeekValue(null);
      return;
    }

    // PEEK
    if (op === "Peek") {
      if (head) setPeekValue(head.value);
      else setPeekValue("Empty Stack");
      return;
    }

    // CLEAR
    if (op === "Clear") {
      setHead(null);
      setPeekValue(null);
      return;
    }
  }, [op, opArgs]); // <-- IMPORTANT: rerun on every Apply

  // Collect nodes for rendering
  let curr = head;
  const nodes = [];
  while (curr) {
    nodes.push(curr.value);
    curr = curr.next;
  }

  return (
    <div>
      {/* Peek result */}
      {peekValue !== null && (
        <div
          style={{
            marginBottom: 12,
            padding: "8px 12px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 6,
            width: "fit-content",
          }}
        >
          Top Element: <b>{peekValue}</b>
        </div>
      )}

      {/* Display TOP pointer */}
      <div style={{ marginBottom: 10, fontSize: 18 }}>
        <b>TOP →</b>
      </div>

      {/* Linked list nodes */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        {nodes.map((v, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(255,255,255,0.12)",
                borderRadius: 8,
                minWidth: 50,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              {v}
            </div>
            <div style={{ fontSize: 22 }}>→</div>
          </div>
        ))}

        {/* End of LL */}
        <div style={{ fontSize: 18 }}>NULL</div>
      </div>
    </div>
  );
}
