import React from "react";
import { Link } from "react-router-dom";

export default function DSPageLayout({ title, children }) {
  return (
    <div className="page-container">

      {/* Page Title */}
      <h1 className="hero-title" style={{ marginBottom: "20px" }}>
        {title}
      </h1>

      {/* MAIN CONTENT AREA */}
      <div className="ds-content">
        {children}
      </div>

    </div>
  );
}
