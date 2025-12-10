import React from "react";
import DSPageLayout from "../components/ds/DSPageLayout";
import DSTitle from "../components/ds/DSTitle";
import DSTypeCard from "../components/ds/DSTypeCard";

export default function SelectDS() {
  return (
    <DSPageLayout title="Select Data Structure">
      <DSTitle>Pick a data structure to explore</DSTitle>

      <div className="ds-grid">
        <DSTypeCard title="Array" to="/build?ds=Array" />
        <DSTypeCard title="Linked List" to="/linkedlist" />
        <DSTypeCard title="Stack" to="/stack" />
        <DSTypeCard title="Queue" to="/queue" />
        <DSTypeCard title="Tree" to="/tree" />
        <DSTypeCard title="Heap" to="/heap" />
        <DSTypeCard title="Graph" to="/graph" />
      </div>
    </DSPageLayout>
  );
}
