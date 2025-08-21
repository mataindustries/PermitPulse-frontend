// src/components/CityBlock.tsx
import { useEffect, useState } from "react";
import { api, PermitRow } from "../lib/api";
import RecentTable from "./RecentTable";

type City = "weho" | "beverlyhills" | "combined";

export default function CityBlock({ city }: { city: City }) {
  const [rows, setRows] = useState<PermitRow[]>([]);
    const [loading, setLoading] = useState(true);
      const [err, setErr] = useState<string | null>(null);

        useEffect(() => {
            let fx =
                  city === "weho"
                          ? api.wehoRecent
                                  : city === "beverlyhills"
                                          ? api.bevhillsRecent
                                                  : api.combinedRecent;

                                                      setLoading(true);
                                                          setErr(null);
                                                              fx()
                                                                    .then((r: any) => setRows(r.rows || []))
                                                                          .catch((e) => setErr(e.message))
                                                                                .finally(() => setLoading(false));
                                                                                  }, [city]);

                                                                                    return (
                                                                                        <div className="card">
                                                                                              <div className="row">
                                                                                                      <h3>
                                                                                                                {city === "weho"
                                                                                                                            ? "West Hollywood – Recent Permits"
                                                                                                                                        : city === "beverlyhills"
                                                                                                                                                    ? "Beverly Hills – Recent Permits"
                                                                                                                                                                : "LA City + County – Recent Permits"}
                                                                                                                                                                        </h3>
                                                                                                                                                                                <div className="spacer" />
                                                                                                                                                                                        {city === "weho" && (
                                                                                                                                                                                                  <a className="btn" href={`${import.meta.env.VITE_WORKER_BASE}/weho/csv`}>
                                                                                                                                                                                                              Download CSV
                                                                                                                                                                                                                        </a>
                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                        {city === "beverlyhills" && (
                                                                                                                                                                                                                                                  <a
                                                                                                                                                                                                                                                              className="btn"
                                                                                                                                                                                                                                                                          href={`${import.meta.env.VITE_WORKER_BASE}/beverlyhills/csv`}
                                                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                                                Download CSV
                                                                                                                                                                                                                                                                                                          </a>
                                                                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                              {loading ? (
                                                                                                                                                                                                                                                                                                                                      <p>Loading…</p>
                                                                                                                                                                                                                                                                                                                                            ) : err ? (
                                                                                                                                                                                                                                                                                                                                                    <p className="error">{err}</p>
                                                                                                                                                                                                                                                                                                                                                          ) : rows.length ? (
                                                                                                                                                                                                                                                                                                                                                                  <RecentTable rows={rows} />
                                                                                                                                                                                                                                                                                                                                                                        ) : (
                                                                                                                                                                                                                                                                                                                                                                                <p>No rows yet.</p>
                                                                                                                                                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                            }