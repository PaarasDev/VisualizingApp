import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="navbar glass-nav fade-in">
      <div className="nav-buttons">

        <button className="nav-icon-btn" onClick={() => navigate("/")}>
          <span className="nav-icon">🏠</span>
          Home
        </button>

        <button className="nav-icon-btn" onClick={() => navigate(-1)}>
          <span className="nav-icon">⬅️</span>
          Back
        </button>

        <button className="nav-icon-btn" onClick={() => navigate(1)}>
          <span className="nav-icon">➡️</span>
          Forward
        </button>
      </div>

      <div className="nav-logo">
        <span>LayItOut</span>
      </div>
    </div>
  );
}
