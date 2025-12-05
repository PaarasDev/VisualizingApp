import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar";

export default function BuildDS() {
  const { dsType } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  return (
    <div className="page fade-in">

      <NavBar />

      <div className="hero">
        <div className="hero-title">Build {dsType}</div>
        <div className="hero-subtitle">
          Enter comma-separated values to initialize your {dsType} data structure.
        </div>
      </div>

      <div className="input-row">

        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: 10, 20, 30, 40"
        />

        <button
          className="btn"
          onClick={() =>
            navigate(
              `/visualize/${encodeURIComponent(dsType)}`,
              { state: { input } }
            )
          }
        >
          Build Structure →
        </button>
      </div>
    </div>
  );
}
