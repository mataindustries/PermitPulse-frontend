// src/components/RecentTable.tsx
import type { PermitRow } from "../lib/api";

export default function RecentTable({ rows }: { rows: PermitRow[] }) {
  // Try to render sensible columns; fall back gracefully
    const keys = rows.length
        ? Object.keys(rows[0]).slice(0, 8)
            : ["permit_number", "issue_date", "address", "status"];

              return (
                  <div className="table-wrap">
                        <table>
                                <thead>
                                          <tr>{keys.map((k) => <th key={k}>{k}</th>)}</tr>
                                                  </thead>
                                                          <tbody>
                                                                    {rows.map((r, i) => (
                                                                                <tr key={i}>
                                                                                              {keys.map((k) => (
                                                                                                              <td key={k}>{fmt(r[k])}</td>
                                                                                                                            ))}
                                                                                                                                        </tr>
                                                                                                                                                  ))}
                                                                                                                                                          </tbody>
                                                                                                                                                                </table>
                                                                                                                                                                    </div>
                                                                                                                                                                      );
                                                                                                                                                                      }

                                                                                                                                                                      function fmt(v: any) {
                                                                                                                                                                        if (v == null) return "";
                                                                                                                                                                          if (typeof v === "string") return v;
                                                                                                                                                                            if (typeof v === "number") return String(v);
                                                                                                                                                                              if (v?.toDate) return new Date(v.toDate()).toLocaleString();
                                                                                                                                                                                if (typeof v === "object") return JSON.stringify(v);
                                                                                                                                                                                  return String(v);
                                                                                                                                                                                  }