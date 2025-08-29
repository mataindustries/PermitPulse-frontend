// src/lib/api.ts
// Centralized API base + helpers

const ENV_BASE =
  (typeof window !== "undefined" && (window as any).VITE_API_BASE) ||
  (import.meta &&
    (import.meta as any).env &&
    (import.meta as any).env.VITE_API_BASE) ||
  "";

// Fallbacks that work on mobile and Pages:
const API_BASE =
  ENV_BASE && !ENV_BASE.startsWith("http")
    ? `https://${ENV_BASE}`
    : ENV_BASE || "https://api.getpermitpulse.com";

export type Permit = {
  permit_number: string | null;
  status: string | null;
  issue_date: string | null;
  address: string | null;
  work_description: string | null;
  city?: string | null;
  _raw?: unknown;
};

async function getJSON<T = any>(path: string): Promise<T> {
  const url = `${API_BASE}${path}`;
  const r = await fetch(url, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

export async function health() {
  return getJSON<{ ok: boolean; worker: string; version: string; ts: string }>(
    "/health",
  );
}

// City → route map (matches your new Worker)
const CITY_ROUTE: Record<string, string> = {
  weho: "/weho/recent",
  "beverly hills": "/beverlyhills/recent",
  palisades: "/palisades/recent",
  altadena: "/altadena/recent",
  "san diego": "/sandiego/recent",
  sacramento: "/sacramento/recent",
};

export type CityKey = keyof typeof CITY_ROUTE;

export async function fetchRecent(cityKey: CityKey) {
  const path = CITY_ROUTE[cityKey];
  if (!path) throw new Error(`Unknown city: ${cityKey}`);
  const data = await getJSON<{
    ok: boolean;
    city: string;
    count: number;
    permits: Permit[];
  }>(path);
  return data.permits ?? [];
}

export function apiBaseForDebug() {
  return API_BASE;
} // --- Waitlist subscribe (appended by quick script) ---
export async function subscribe(email: string, city?: string) {
  if (!email) throw new Error("email required");
  const base =
    (import.meta as any).env?.VITE_API_BASE?.replace(/\/+$/, "") ||
    "https://api.getpermitpulse.com";
  const r = await fetch(`${base}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, city }),
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => "");
    throw new Error(`Subscribe failed: ${r.status} ${r.statusText} ${txt}`);
  }
  return r.json();
}export async function submitWaitlist(email: string, opts?: { city?: string }) {
    const base = "https://pp-waitlist.matasergio741.workers.dev"; // your Worker URL
      const res = await fetch(`${base}/subscribe`, {
          method: "POST",
              headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                        email,
                              city: opts?.city || null,
                                  }),
                                    });

                                      return res.json(); // gives back { ok: true, status: "subscribed" | "exists" }
                                      }
}
