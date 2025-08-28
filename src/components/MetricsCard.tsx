type Props = { total: number; recent: number; change: number };
export default function MetricsCard({ total, recent, change }: Props) {
  return (
    <div className="card" style={{ padding: 16, marginBottom: 16 }}>
      <h3 style={{ margin: 0, fontSize: 16 }}>At a glance</h3>
      <p>Total permits: {total}</p>
      <p>Last 30 days: {recent}</p>
      <p>
        Change vs prev 30 days: {change >= 0 ? "+" : ""}
        {change}
      </p>
    </div>
  );
}
