// src/lib/api.ts
export async function subscribeToWaitlist(
  email: string,
  city?: string
): Promise<{ ok: boolean; status?: "subscribed" | "exists" }> {
  // If VITE_WAITLIST_URL is set, call the Worker directly.
  // Otherwise hit the local /subscribe (Pages rewrite should forward it).
  const base = (import.meta as any)?.env?.VITE_WAITLIST_URL?.toString().trim();
  const url = base ? `${base.replace(/\/+$/,"")}/subscribe` : "/subscribe";

  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, city })
  });

  try {
    const data = await r.json();
    return { ok: r.ok && !!data?.ok, status: data?.status };
  } catch {
    return { ok: r.ok };
  }
}

// keep a named export for consumers
