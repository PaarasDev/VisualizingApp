export default function OperationsMenu({ ds, setOp }) {
  const OPS = {
    Array: ["Insert", "Delete", "Update", "Search"],
    "Linked List": ["Insert Head", "Insert Tail", "Insert At", "Delete At", "Search", "Reverse"],
    Stack: ["Push", "Pop", "Peek"],
    Queue: ["Enqueue", "Dequeue", "Front"],
    Tree: ["Insert", "Search", "Inorder", "Preorder", "Postorder", "LevelOrder"],
    Heap: ["Insert", "Delete", "BuildHeap"],
    Graph: ["Add Node", "Add Edge", "BFS", "DFS"]
  };

  return (
    <select className="input-box" onChange={(e) => setOp(e.target.value)}>
      <option value="">Select Operation</option>
      {OPS[ds]?.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
  );
}
