interface PermitRow {
  permit_number?: string;
  status?: string;
  issue_date?: string;
  address?: string;
  work_description?: string;
  valuation?: number | null;
}

function j(data: unknown, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

/** Socrata helper (GET only here) */
async function socrataGET(baseUrl: string, params: Record<string, string|number|null|undefined> = {}) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([k,v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  const r = await fetch(url.toString());
  const text = await r.text();
  try {
    return { ok: r.ok, status: r.status, data: JSON.parse(text) };
  } catch {
    return { ok: r.ok, status: r.status, data: text };
  }
}

async function wehoRecent(): Promise<PermitRow[]> {
  // placeholder: adjust to your actual source (same as your old Worker)
  return [];
}
async function beverlyHillsRecent(): Promise<PermitRow[]> { return []; }
async function palisadesRecent(): Promise<PermitRow[]> { return []; }
async function altadenaRecent(): Promise<PermitRow[]> { return []; }

export default {
  async fetch(req: Request) {
    const p = new URL(req.url).pathname;

    if (p === "/weho/recent") {
      return j({ ok:true, city:"West Hollywood", permits: await wehoRecent() });
    }
    if (p === "/beverlyhills/recent") {
      return j({ ok:true, city:"Beverly Hills", permits: await beverlyHillsRecent() });
    }
    if (p === "/palisades/recent") {
      return j({ ok:true, city:"Palisades", permits: await palisadesRecent() });
    }
    if (p === "/altadena/recent") {
      return j({ ok:true, city:"Altadena", permits: await altadenaRecent() });
    }
    if (p === "/health") return j({ ok:true, worker:"la" });

    return j({ ok:false, error:"not_found", path:p }, 404);
  }
} satisfies ExportedHandler;
