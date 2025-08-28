import { useMemo } from "react";
import type { Permit } from "@/lib/api";

export default function CityStats({ rows }: { rows: Permit[] }) {
  const { total, last7, prev7 } = useMemo(() => {
    let total = rows.length;
    const today = new Date();
    let last7 = 0,
      prev7 = 0;
    for (const r of rows) {
      const d = new Date(r.issue_date || r.issued_date || r.status_date || "");
      if (isNaN(+d)) continue;
      const diff = (today.getTime() - d.getTime()) / 86400000;
      if (diff <= 7) last7++;
      else if (diff > 7 && diff <= 14) prev7++;
    }
    return { total, last7, prev7 };
  }, [rows]);

  const delta = last7 - prev7;
  return (
    <div
      style={{
        border: "1px solid #1f2732",
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
      }}
    >
      <div>
        <b>Total permits:</b> {total}
      </div>
      <div>
        <b>Last 7 days:</b> {last7}
      </div>
      <div>
        <b>Change vs prev 7 days:</b>
        <span style={{ color: delta >= 0 ? "#7fff9f" : "#ff7b7b" }}>
          {" "}
          {delta >= 0 ? `+${delta}` : delta}
        </span>
      </div>
    </div>
  );
}
