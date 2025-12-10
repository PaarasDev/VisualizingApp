import React from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import DSTypeCard from "../../components/ds/DSTypeCard";

export default function GraphTypes() {
  return (
    <DSPageLayout title="Graph Types">
      <DSTitle>Graph Variants</DSTitle>

      <div className="ds-grid">
        <DSTypeCard title="Directed Graph" to="/graph/directed" />
        <DSTypeCard title="Undirected Graph" to="/graph/undirected" />
        <DSTypeCard title="Weighted Graph" to="/graph/weighted" />
      </div>
    </DSPageLayout>
  );
}
