export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "Free",
      desc: "Basic city permit tracking for individuals.",
      features: [
        "1 City access",
        "30-day permit history",
        "Email alerts (coming soon)",
      ],
    },
    {
      name: "Pro",
      price: "$29 /mo",
      desc: "For small businesses who need deeper insights.",
      features: [
        "Up to 3 cities",
        "1-year permit history",
        "Trends + charts",
        "Priority email alerts",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Tailored solutions for enterprises, law firms, and agencies.",
      features: [
        "Unlimited cities",
        "Full history",
        "API access",
        "Dedicated support",
      ],
    },
  ];

  return (
    <div style={{ padding:"20px", maxWidth:900, margin:"0 auto" }}>
      <h1 style={{ fontSize:28, fontWeight:700, marginBottom:8 }}>Pricing</h1>
      <p style={{ opacity:0.7, marginBottom:24 }}>
        Choose the plan that fits your needs. Upgrade anytime.
      </p>
      <div style={{
        display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
        gap:20
      }}>
        {tiers.map(t => (
          <div key={t.name} style={{
            border:"1px solid #1f2732", borderRadius:14, padding:20,
            background:"#0d141c", color:"#dbe7ff"
          }}>
            <h2 style={{ fontSize:20, marginBottom:4 }}>{t.name}</h2>
            <div style={{ fontSize:22, fontWeight:600, marginBottom:8 }}>{t.price}</div>
            <p style={{ fontSize:13, opacity:0.8, marginBottom:12 }}>{t.desc}</p>
            <ul style={{ paddingLeft:20, margin:0, fontSize:13 }}>
              {t.features.map(f=> <li key={f}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
