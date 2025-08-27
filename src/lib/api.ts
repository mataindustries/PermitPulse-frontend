const __FALLBACK_URL="https://permitpulse-worker.matasergio741.workers.dev";
const API_BASE = (import.meta.env.VITE_API_BASE ?? '').replace(/\/+$/,''); // e.g. https://permitpulse-worker.matasergio741.workers.dev

export type CityKey = 'weho' | 'beverlyhills' | 'altadena' | 'palisades';
export type Permit = Record<string, unknown>;

function looksJson(resp: Response) {
  const ct = resp.headers.get('content-type') || '';
  return ct.includes('application/json') || ct.includes('json');
}

async function fetchJSON(url: string): Promise<any> {
  let r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  if (!looksJson(r)) {
    const text = (await r.text()).slice(0, 120);
    throw new Error(`Not JSON: ${text}`);
  }
  return r.json();
}

function extractRows(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (data?.items && Array.isArray(data.items)) return data.items;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (Array.isArray(data?.payload)) return data.payload;
  if (Array.isArray(data?.rows)) return data.rows;
  return [];
}

export async function fetchRecent(city: CityKey): Promise<Permit[]> {
  const base = API_BASE.replace(/\/+$/,'');
  const url = `${base}/${city}/recent`;
  const data = await fetchJSON(url);
  return extractRows(data);
}

export async function fetchHealth() {
  const base = API_BASE.replace(/\/+$/,'');
  const url = `${base}/health`;
  return fetchJSON(url);
}
