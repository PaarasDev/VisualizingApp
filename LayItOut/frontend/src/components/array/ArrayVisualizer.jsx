import React, { useState, useEffect } from "react";

export default function ArrayVisualizer({ input, op, opArgs, applyTrigger }) {
  const [array, setArray] = useState(
    input.split(",").map((x) => x.trim())
  );

  const [result, setResult] = useState(null); // ✅ store search output

  // Update when input changes
  useEffect(() => {
    setArray(input.split(",").map((x) => x.trim()));
    setResult(null); // clear old result
  }, [input]);

  // Run operation only when Apply button is pressed
  useEffect(() => {
    if (!op) return;

    let newArr = [...array];
    setResult(null); // Clear previous operation message

    if (op === "Insert") {
      if (opArgs) {
        newArr = [...newArr, opArgs];
        setArray(newArr);
      }
    }

    else if (op === "Delete") {
      const index = parseInt(opArgs);
      if (!isNaN(index) && index >= 0 && index < newArr.length) {
        newArr.splice(index, 1);
        setArray(newArr);
      }
    }

    else if (op === "Update") {
      const [index, value] = opArgs.split(",");
      const idx = parseInt(index);

      if (!isNaN(idx) && value !== undefined && idx < newArr.length) {
        newArr[idx] = value.trim();
        setArray(newArr);
      }
    }

    else if (op === "Search") {
      const idx = newArr.indexOf(opArgs.trim());

      // ✅ Instead of alert, we show the result in UI
      setResult(idx === -1 ? "Not Found" : `Found at index ${idx}`);
    }

  }, [applyTrigger]); // Apply only when button clicked

  return (
    <div
      style={{
        marginTop: "40px",
        padding: "20px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.05)",
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >

      {/* 🔵 SEARCH RESULT / OUTPUT BOX */}
      {result !== null && (
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
          <strong>Output:</strong> {result}
        </div>
      )}

      {/* ARRAY BLOCKS */}
      <div style={{ display: "flex", gap: "30px" }}>
        {array.map((value, index) => (
          <div key={index} style={{ textAlign: "center" }}>

            {/* INDEX */}
            <div
              style={{
                color: "#94a3b8",
                fontSize: "0.9rem",
                marginBottom: "6px",
              }}
            >
              {index}
            </div>

            {/* VALUE BLOCK */}
            <div
              style={{
                padding: "18px 28px",
                background: "#1e293b",
                borderRadius: "10px",
                border: "1px solid #334155",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
