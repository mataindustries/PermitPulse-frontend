import React from "react";

export default function ExpansionBar({ onJoin }: { onJoin: () => void }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background:
          "linear-gradient(90deg, rgba(20,28,48,.95), rgba(28,44,84,.95))",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        padding: "10px 12px",
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#34d399",
          boxShadow: "0 0 0 0 rgba(52,211,153,.7)",
          animation: "pulseDot 1.8s infinite",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, color: "#dbeafe", fontWeight: 700 }}>
        California rollout in-progress → <b>San Diego</b> & <b>Sacramento</b>{" "}
        next. Early access closing soon.
      </div>
      <button
        onClick={onJoin}
        style={{
          background: "#60a5fa",
          color: "#0b1220",
          fontWeight: 800,
          border: 0,
          padding: "8px 12px",
          borderRadius: 10,
        }}
      >
        Join Waitlist
      </button>
      <a
        href="https://buy.stripe.com/4gM7sM6Ld86L0l94NA1wY07"
        style={{
          background: "#22c55e",
          color: "#0b1220",
          fontWeight: 800,
          padding: "8px 12px",
          borderRadius: 10,
          textDecoration: "none",
          marginLeft: 8,
        }}
      >
        Upgrade to Pro
      </a>
      <style>
        {`@keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(52,211,153,.7) }
          70% { box-shadow: 0 0 0 12px rgba(52,211,153,0) }
          100% { box-shadow: 0 0 0 0 rgba(52,211,153,0) }
        }`}
      </style>
    </div>
  );
}
