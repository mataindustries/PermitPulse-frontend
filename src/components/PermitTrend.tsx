import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Permit } from "@/lib/api";

function getDayKey(d: string) {
  const dt = new Date(d);
  return dt.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function PermitTrend({ rows }: { rows: Permit[] }) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of rows) {
      const d = r.issue_date || r.issued_date || r.status_date;
      if (!d) continue;
      const key = getDayKey(d);
      counts[key] = (counts[key] || 0) + 1;
    }
    return Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [rows]);

  if (!data.length)
    return <div style={{ fontSize: 12, opacity: 0.7 }}>No trend data</div>;

  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8ab4ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
