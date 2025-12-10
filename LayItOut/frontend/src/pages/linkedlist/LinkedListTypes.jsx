import DSPageLayout from "../../components/ds/DSPageLayout";
import DSTitle from "../../components/ds/DSTitle";
import DSTypeCard from "../../components/ds/DSTypeCard";

export default function LinkedListTypes() {
  return (
    <DSPageLayout title="Linked List Types">
      <DSTitle>Select Linked List Type</DSTitle>

      <div className="ds-grid">
        <DSTypeCard title="Singly Linked List" to="/linkedlist/singly" />
        <DSTypeCard title="Doubly Linked List" to="/linkedlist/doubly" />
        <DSTypeCard title="Circular Linked List" to="/linkedlist/circular" />
      </div>
    </DSPageLayout>
  );
}
