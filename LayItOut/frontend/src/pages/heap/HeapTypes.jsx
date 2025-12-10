import React from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import DSTypeCard from "../../components/ds/DSTypeCard";

export default function HeapTypes() {
  return (
    <DSPageLayout title="Heap Types">
      <DSTitle>Heap Variants</DSTitle>

      <div className="ds-grid">
        <DSTypeCard title="Min Heap" to="/heap/min" />
        <DSTypeCard title="Max Heap" to="/heap/max" />
      </div>
    </DSPageLayout>
  );
}
