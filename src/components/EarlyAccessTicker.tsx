import React, { useEffect, useState } from "react";

type Stats = { ok: boolean; total: number; joined: number; remaining: number };

export default function EarlyAccessTicker() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const r = await fetch("https://api.getpermitpulse.com/waitlist/stats", {
          headers: { Accept: "application/json" },
        });
        const j = (await r.json()) as Stats;
        if (!cancel && j?.ok) {
          setRemaining(j.remaining);
          setTotal(j.total);
        }
      } catch {
        if (!cancel) { setRemaining(72); setTotal(100); } // safe fallback
      }
    })();
    return () => { cancel = true; };
  }, []);

  return (
    <div className="w-full bg-emerald-500/10 border-b border-emerald-400/20 text-emerald-200 text-sm px-3 py-2 text-center">
      {remaining != null && total != null
        ? <>⚡ <b>{remaining}</b> early-access spots left (of {total}) — lock in founder pricing today</>
        : <>⚡ Early-access spots are limited — lock in founder pricing today</>}
    </div>
  );
}
