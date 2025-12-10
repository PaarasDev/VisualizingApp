import React from "react";
import { useNavigate } from "react-router-dom";

export default function DSTypeCard({ title, to }) {
  const navigate = useNavigate();

  return (
    <div
      className="ds-card"
      onClick={() => navigate(to)}
      style={{ cursor: "pointer" }}
    >
      {title}
    </div>
  );
}
