import React from "react";

type LiveCity = "weho" | "beverlyhills" | "altadena" | "palisades";

export default function CityButtons({
  city,
  onChange,
  onComingSoon,
}: {
  city: LiveCity;
  onChange: (c: LiveCity) => void;
  onComingSoon?: (label: string) => void;
}) {
  const live: { key: LiveCity; label: string }[] = [
    { key: "weho", label: "WeHo" },
    { key: "beverlyhills", label: "Beverly Hills" },
    { key: "altadena", label: "Altadena" },
    { key: "palisades", label: "Palisades" },
  ];

  const comingSoon: string[] = [
    "San Diego",
    "Sacramento",
    "San Jose",
    "Santa Clara",
    "San Francisco",
    "Long Beach",
    "Culver City",
  ];

  const pill = {
    base: {
      padding: "8px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,.08)",
      background: "#0f172a",
      color: "#e5e7eb",
      cursor: "pointer",
      fontWeight: 700 as const,
    },
    active: {
      background: "#1f3b77",
      borderColor: "rgba(99,102,241,.4)",
    },
    soon: {
      background: "transparent",
      color: "#93c5fd",
      borderStyle: "dashed" as const,
      borderColor: "rgba(147,197,253,.4)",
    },
  };

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
      {live.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          style={{
            ...pill.base,
            ...(city === c.key ? pill.active : {}),
          }}
        >
          {c.label}
        </button>
      ))}

      <span style={{ opacity: 0.6, marginLeft: 6 }}>Next:</span>
      {comingSoon.map((label) => (
        <button
          key={label}
          onClick={() => onComingSoon?.(label)}
          title="Join waitlist for early access"
          style={{ ...pill.base, ...pill.soon }}
        >
          {label} 🚧
        </button>
      ))}
    </div>
  );
}
