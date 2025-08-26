const API_BASE = ''; // same-origin via your domain routes

export type CityKey = 'weho' | 'beverlyhills' | 'altadena' | 'palisades' | 'combined';
export type Permit = Record<string, unknown>;

function looksJson(resp: Response) {
  const ct = resp.headers.get('content-type') || '';
  return ct.includes('application/json') || ct.includes('json');
}

async function fetchJSON(url: string): Promise<any> {
  let r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (looksJson(r)) return r.json();

  const toggled = url.endsWith('/') ? url.slice(0, -1) : url + '/';
  const r2 = await fetch(toggled, { headers: { Accept: 'application/json' } });
  if (looksJson(r2)) return r2.json();

  const txt = await r.text().catch(() => '');
  const txt2 = await r2.text().catch(() => '');
  throw new Error(`Not JSON: ${txt.slice(0,80) || txt2.slice(0,80)}`);
}

function extractRows(data: any): Permit[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.rows)) return data.rows;
  return [];
}

export async function fetchRecent(city: CityKey): Promise<Permit[]> {
  const base = API_BASE.replace(/\/+$/, '');
  const path = city === 'combined' ? '/combined/recent' : `/${city}/recent`;
  const data = await fetchJSON(`${base}${path}`);
  return extractRows(data);
}

export async function fetchHealth() {
  const base = API_BASE.replace(/\/+$/, '');
  return fetchJSON(`${base}/health`);
}

export async function joinWaitlist(city: Exclude<CityKey,'combined'>, email: string) {
  const base = API_BASE.replace(/\/+$/, '');
  const r = await fetch(`${base}/waitlist/${city}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!r.ok) throw new Error(`Waitlist failed: ${r.status}`);
  return looksJson(r) ? r.json() : { ok: r.ok };
}
