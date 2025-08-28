import React from "react";

export default function Pricing() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Pricing</h1>
      <p style={{ opacity: 0.8 }}>Founder access is limited. Lock it now.</p>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          marginTop: 16,
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 12,
            padding: 18,
            background: "#0f172a",
          }}
        >
          <h3>Free</h3>
          <ul>
            <li>LA pilot cities</li>
            <li>Basic search</li>
            <li>Weekly refresh</li>
          </ul>
        </div>
        <div
          style={{
            border: "2px solid #60a5fa",
            borderRadius: 12,
            padding: 18,
            background: "#0b1220",
          }}
        >
          <h3
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            PermitPulse Pro{" "}
            <span
              style={{
                fontSize: 12,
                background: "#60a5fa",
                color: "#0b1220",
                padding: "2px 8px",
                borderRadius: 999,
              }}
            >
              Founder Deal
            </span>
          </h3>
          <ul>
            <li>Priority new cities (SD, SAC, SJ, SF, LB, CC)</li>
            <li>Daily updates</li>
            <li>CSV export</li>
            <li>Email alerts</li>
            <li>VIP onboarding</li>
          </ul>
          <a
            href="https://buy.stripe.com/4gM7sM6Ld86L0l94NA1wY07"
            style={{
              display: "inline-block",
              marginTop: 8,
              background: "#22c55e",
              color: "#0b1220",
              fontWeight: 800,
              padding: "10px 14px",
              borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Upgrade – Secure Founder Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
