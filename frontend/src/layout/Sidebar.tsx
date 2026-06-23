import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "20px",
      position: "fixed"
    }}>
      <h2>🛡️ ScamShield</h2>

      <NavLink to="/" style={{ display: "block", margin: "10px 0", color: "white" }}>
        Dashboard
      </NavLink>

      <NavLink to="/url" style={{ display: "block", margin: "10px 0", color: "white" }}>
        URL Scanner
      </NavLink>

      <NavLink to="/email" style={{ display: "block", margin: "10px 0", color: "white" }}>
        Email Scanner
      </NavLink>

      <NavLink to="/job" style={{ display: "block", margin: "10px 0", color: "white" }}>
        Job Scanner
      </NavLink>

      <NavLink to="/reports" style={{ display: "block", margin: "10px 0", color: "white" }}>
        Reports
      </NavLink>
    </div>
  );
}

export default Sidebar;