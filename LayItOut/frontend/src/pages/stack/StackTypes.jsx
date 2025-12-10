import React from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import DSTypeCard from "../../components/ds/DSTypeCard";

export default function StackTypes() {
  return (
    <DSPageLayout title="Stack Types">
      <DSTitle>Stack Variants</DSTitle>

      <div className="ds-grid">
        {/* This is your Array Stack → BasicStack.jsx */}
        <DSTypeCard title="Array Stack" to="/stack/basic" />

        {/* TEMP: LinkedList stack not created yet → link to MIN stack */}
        <DSTypeCard title="LinkedList Stack" to="/stack/min" />
      </div>
    </DSPageLayout>
  );
}
