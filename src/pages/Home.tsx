import React, { useState,  useEffect, useMemo, useState } from "react";
import WaitlistModal from '../components/WaitlistModal';
import ExpansionBar from "../components/ExpansionBar";
import CityStats from "../components/CityStats";
import PermitTrend from "../components/PermitTrend";
import PermitTable from "../components/PermitTable";
import CityButtons from "../components/CityButtons";

type Permit = {
  permit_number: string;
  status?: string;
  issue_date?: string;
  address?: string;
  work_description?: string;
};
type ApiRes = {
  ok: boolean;
  city?: string;
  permits?: Permit[];
  count?: number;
  ts?: string;
};

const API =
  (import.meta as any).env?.VITE_API_BASE?.replace(/\/+$/, "") ||
  "https://api.getpermitpulse.com";

export default function Home() {
  const [city, setCity] = useState<
    "weho" | "beverlyhills" | "altadena" | "palisades"
  >("weho");
  const [rows, setRows] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ts, setTs] = useState<string | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistDefaultCity, setWaitlistDefaultCity] = useState<

  function openWaitlist(c?: string) {
    setWaitlistDefaultCity(c);
    setWaitlistOpen(true);
  }

    string | undefined
  >(undefined);
  const [q, setQ] = useState("");

  useEffect(() => {
    let stop = false;
    async function go() {
      setLoading(true);
      setErr(null);
      try {
        const r = await fetch(`${API}/${city}/recent`, {
          headers: { Accept: "application/json" },
        });
        if (!r.ok) throw new Error(String(r.status));
        const j: ApiRes = await r.json();
        if (!stop) {
          setRows(j.permits || []);
          setTs(j.ts || null);
        }
      } catch (e: any) {
        if (!stop) setErr(e?.message || "Failed to fetch");
      } finally {
        if (!stop) setLoading(false);
      }
    }
    go();
    return () => {
      stop = true;
    };
  }, [city]);

  const viewRows = useMemo(() => {
    let r = rows;
    if (q) {
      const s = q.toLowerCase();
      r = r.filter(
        (x) =>
          x.permit_number?.toLowerCase().includes(s) ||
          x.address?.toLowerCase().includes(s) ||
          x.work_description?.toLowerCase().includes(s) ||
          x.status?.toLowerCase().includes(s),
      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        defaultCity={waitlistDefaultCity ?? city}
      />
      );
    }
    const demo = new URLSearchParams(location.search).get("demo") === "1";
    if (r.length === 0 && demo) {
      r = [
        {
          permit_number: "BH-24-00123",
          status: "Issued",
          issue_date: "2025-08-20",
          address: "123 N Canon Dr",
          work_description: "Kitchen Remodel",
        },
        {
          permit_number: "WEHO-24-44567",
          status: "Issued",
          issue_date: "2025-08-18",
          address: "8421 Sunset Blvd",
          work_description: "Tenant Improvement",
        },
      ];
    }
    return r;
  }, [rows, q]);

  return (
    <div style={{ paddingBottom: 40 }}>
      <ExpansionBar
        onJoin={() => {
          setWaitlistDefaultCity(undefined);
          setWaitlistOpen(true);
        }}
      />
      <div
        className="container"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "16px" }}
      >
        <h1 style={{ marginTop: 8 }}>PermitPulse</h1>
        <div style={{ margin: "12px 0" }}>
          <CityButtons
            city={city}
            onChange={setCity}
            onComingSoon={(label) => {
              setWaitlistDefaultCity(label);
              setWaitlistOpen(true);
            }}
          />
        <div className="mt-4 flex justify-center">
          <button
            id="cta-waitlist"
              onClick={() => setWaitlistOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Join Waitlist
                  </button>>
        </div>
        </div>

        <input
          placeholder="Search address, status, permit #"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            width: "100%",
            background: "#0f172a",
            color: "white",
            border: "1px solid rgba(255,255,255,.12)",
            padding: "10px 12px",
            borderRadius: 10,
            margin: "8px 0 16px",
          }}
        />

        <h2 style={{ marginTop: 10, marginBottom: 8 }}>
          {city === "weho" && "West Hollywood"}
          {city === "beverlyhills" && "Beverly Hills"}
          {city === "altadena" && "Altadena"}
          {city === "palisades" && "Palisades"}
        </h2>

        <div style={{ opacity: 0.85, marginBottom: 12, fontSize: 14 }}>
          {ts ? `Last updated: ${new Date(ts).toLocaleString()}` : ""}
          {q ? ` · filter: “${q}”` : ""}
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => setWaitlistOpen(true)} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Join Waitlist
          </button>
        </div>
        </div>

        <CityStats rows={viewRows} />
        <PermitTrend rows={viewRows} />

        <PermitTable
          rows={viewRows}
          loading={loading}
          error={err}
          showCity={false}
          sortKey={"issue_date"}
          sortDir={"desc"}
          onSort={() => {}}
        />

        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => setWaitlistOpen(true)} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Join Waitlist
          </button>
        </div>
      </div>
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => setWaitlistOpen(true)} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Join Waitlist
          </button>
        </div>
    </div>
  );
}
