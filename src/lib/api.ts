const API_BASE = ''; // same-origin via your custom domain route

export type CityKey = 'weho' | 'beverlyhills' | 'altadena' | 'palisades';
export type Permit = Record<string, unknown>;

function looksJson(resp: Response) {
  const ct = resp.headers.get('content-type') || '';
  return ct.includes('application/json') || ct.includes('json');
}

async function fetchJSON(url: string): Promise<any> {
  // try exact url first
  let r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!r.ok && r.status >= 300 && r.status < 400) {
    const loc = r.headers.get('location');
    if (loc) r = await fetch(loc, { headers: { Accept: 'application/json' } });
  }
  if (looksJson(r)) return r.json();

  // if we got HTML (index.html), try toggling trailing slash
  const toggled = url.endsWith('/') ? url.slice(0, -1) : url + '/';
  let r2 = await fetch(toggled, { headers: { Accept: 'application/json' } });
  if (!r2.ok && r2.status >= 300 && r2.status < 400) {
    const loc2 = r2.headers.get('location');
    if (loc2) r2 = await fetch(loc2, { headers: { Accept: 'application/json' } });
  }
  if (looksJson(r2)) return r2.json();

  const txt = await r.text().catch(() => '');
  const txt2 = await r2.text().catch(() => '');
  throw new Error(`Not JSON from ${url}. Got: ${txt?.slice(0,80) || txt2?.slice(0,80)}`);
}

function extractRows(data: any): Permit[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.results)) return data.results;
  if (data?.ok && Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.payload)) return data.payload;
  if (Array.isArray(data?.rows)) return data.rows;
  return [];
}

export async function fetchRecent(city: CityKey): Promise<Permit[]> {
  const base = API_BASE.replace(/\/+$/, '');
  const url = `${base}/${city}/recent`; // no trailing slash by default
  const data = await fetchJSON(url);
  return extractRows(data);
}

export async function fetchHealth() {
  const base = API_BASE.replace(/\/+$/, '');
  const url = `${base}/health`;
  return fetchJSON(url);
}
