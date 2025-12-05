import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const DS_LIST = [
  "Array",
  "Linked List",
  "Stack",
  "Queue",
  "Tree",
  "Heap",
  "Graph"
];

export default function SelectDS() {
  const navigate = useNavigate();

  return (
    <div className="page fade-in">

      <NavBar />

      <div className="hero">
        <div className="hero-title">LayItOut — Visual Data Structures Explorer</div>
        <div className="hero-subtitle">
          Choose a data structure to begin building, editing, and visualizing it through beautiful animations.
        </div>
      </div>

      <div className="ds-grid">
        {DS_LIST.map((ds) => (
          <div
            key={ds}
            className="ds-card scale-in"
            onClick={() => navigate(`/build/${encodeURIComponent(ds)}`)}
          >
            {ds}
          </div>
        ))}
      </div>
    </div>
  );
}
