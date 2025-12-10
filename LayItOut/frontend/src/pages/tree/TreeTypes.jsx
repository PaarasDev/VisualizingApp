import React from "react";
import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import DSTypeCard from "../../components/ds/DSTypeCard";

export default function TreeTypes() {
  return (
    <DSPageLayout title="Tree Types">
      <DSTitle>Tree Variants</DSTitle>

      <div className="ds-grid">
        <DSTypeCard title="Binary Tree" to="/tree/binary" />
        <DSTypeCard title="BST" to="/tree/bst" />
        <DSTypeCard title="AVL Tree" to="/tree/avl" />
        <DSTypeCard title="Red-Black Tree" to="/tree/redblack" />
      </div>
    </DSPageLayout>
  );
}
