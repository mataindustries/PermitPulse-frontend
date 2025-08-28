import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid #1f2732",
        marginBottom: 12,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 22 }}>PermitPulse</div>
      <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
        <Link to="/" style={{ color: "#cfe1ff", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link
          to="/pricing"
          style={{ color: "#cfe1ff", textDecoration: "none" }}
        >
          Pricing
        </Link>
      </div>
    </div>
  );
}
