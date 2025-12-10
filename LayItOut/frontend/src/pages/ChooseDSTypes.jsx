import React from "react";
import DSPageLayout from "../components/ds/DSPageLayout";
import DSTitle from "../components/ds/DSTitle";
import DSTypeCard from "../components/ds/DSTypeCard";

export default function ChooseDSTypes() {
  return (
    <DSPageLayout title="Choose Data Structure Type">
      <DSTitle>Choose a specialized variant</DSTitle>

      <div className="ds-grid">
        <DSTypeCard title="Linked List Types" to="/linkedlist" />
        <DSTypeCard title="Tree Types" to="/tree" />
        <DSTypeCard title="Stack Types" to="/stack" />
        <DSTypeCard title="Queue Types" to="/queue" />
        <DSTypeCard title="Heap Types" to="/heap" />
        <DSTypeCard title="Graph Types" to="/graph" />
        <DSTypeCard title="Array" to="/visualize?ds=Array" />
      </div>
    </DSPageLayout>
  );
}
