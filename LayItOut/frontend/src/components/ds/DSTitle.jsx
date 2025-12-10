import React from "react";

export default function DSTitle({ children }) {
  return (
    <h2
      style={{
        fontSize: "26px",
        fontWeight: 700,
        marginBottom: "18px",
        background: "linear-gradient(to right, #6ca0ff, #c18cff)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}
    >
      {children}
    </h2>
  );
}
