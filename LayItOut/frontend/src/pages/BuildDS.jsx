import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DSPageLayout from "../components/ds/DSPageLayout";
import DSTitle from "../components/ds/DSTitle";

export default function BuildDS() {
  const [params] = useSearchParams();
  const dsFromQuery = params.get("ds") || "";
  const [input, setInput] = useState("1,2,3,4");
  const navigate = useNavigate();

  function handleProceed() {
    // navigate to visualize page with query params
    navigate(`/array?data=${input}`);

  }

  return (
    <DSPageLayout title={`Build ${dsFromQuery || "Data Structure"}`}>
      <DSTitle>Build {dsFromQuery || "Data Structure"}</DSTitle>

      <div className="input-row">
        <input
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter values (e.g. 1,2,3 or A,B,C)"
        />
        <button className="btn" onClick={handleProceed} disabled={!dsFromQuery}>
          Proceed to Visualize
        </button>
      </div>
    </DSPageLayout>
  );
}
