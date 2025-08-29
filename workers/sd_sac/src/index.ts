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
    headers: { "content-type":"application/json; charset=utf-8" }
  });
}
async function fetchCSV(url: string, limit = 200): Promise<PermitRow[]> {
  const r = await fetch(url, { cf: { cacheTtl: 300, cacheEverything: true }});
  if (!r.ok) return [];
  const text = await r.text();
  const [header, ...rows] = text.trim().split(/\r?\n/);
  const cols = header.split(",");
  const idx = (name: string) => cols.indexOf(name);
  const out: PermitRow[] = [];
  const idApproval = idx("APPROVAL_ID");
  const st = idx("APPROVAL_STATUS");
  const dt = idx("APPROVAL_ISSUE_DATE");
  const addr = idx("GIS_ADDRESS");
  const scope = idx("PROJECT_SCOPE");
  for (const line of rows.slice(0, limit)) {
    const parts = line.split(",");
    out.push({
      permit_number: parts[idApproval],
      status: parts[st],
      issue_date: parts[dt],
      address: parts[addr],
      work_description: parts[scope] ?? ""
    });
  }
  return out;
}

async function sanDiegoRecent(): Promise<PermitRow[]> {
  const url = "https://seshat.datasd.org/development_permits_set2/permits_set2_active_datasd.csv";
  return fetchCSV(url, 200);
}

async function sacRecent(): Promise<PermitRow[]> {
  // ArcGIS sample query – tighten mapping later
  const base = "https://services5.arcgis.com/54falWtcpty3V47Z/ArcGIS/rest/services/BldgPermitApplied_Archive/FeatureServer/0/query";
  const u = new URL(base);
  Object.entries({
    f:"json",
    where:"1=1",
    outFields:"*",
    orderByFields:"OBJECTID DESC",
    resultRecordCount: 50,
    returnGeometry:"false"
  }).forEach(([k,v]) => u.searchParams.set(k, String(v)));
  const r = await fetch(u.toString());
  if (!r.ok) return [];
  const data = await r.json();
  const feats = data.features ?? [];
  return feats.map((f:any) => {
    const a = f.attributes || {};
    return {
      permit_number: a.Application,
      status: a.Current_Status,
      issue_date: a.Status_Date,
      address: a.Address,
      work_description: a.Work_Desc
    } as PermitRow;
  });
}

export default {
  async fetch(req: Request) {
    const p = new URL(req.url).pathname;

    if (p === "/sandiego/recent") {
      return j({ ok:true, city:"San Diego", permits: await sanDiegoRecent() });
    }
    if (p === "/sacramento/recent") {
      return j({ ok:true, city:"Sacramento", permits: await sacRecent() });
    }
    if (p === "/health") return j({ ok:true, worker:"sd_sac" });

    return j({ ok:false, error:"not_found", path:p }, 404);
  }
} satisfies ExportedHandler;
