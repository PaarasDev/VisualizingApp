import React from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import DSTypeCard from "../../components/ds/DSTypeCard";

export default function QueueTypes() {
  return (
    <DSPageLayout title="Queue Types">
      <DSTitle>Queue Variants</DSTitle>

      <div className="ds-grid">
        <DSTypeCard title="Linear Queue" to="/queue/linear" />
        <DSTypeCard title="Circular Queue" to="/queue/circular" />
        <DSTypeCard title="Priority Queue" to="/queue/priority" />
      </div>
    </DSPageLayout>
  );
}
