const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/+$/, '') || '';

export type CityKey = 'weho' | 'beverlyhills' | 'altadena' | 'palisades';
export type Permit = Record<string, unknown>;

function extractRows(data: any): Permit[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;     // { items: [...] }
  if (Array.isArray(data?.results)) return data.results; // { results: [...] }
  if (data?.ok && Array.isArray(data?.data)) return data.data; // { ok:true, data:[...] }
  // Some APIs nest under .payload or .rows
  if (Array.isArray(data?.payload)) return data.payload;
  if (Array.isArray(data?.rows)) return data.rows;
  return [];
}

export async function fetchRecent(city: CityKey): Promise<Permit[]> {
  const url = `${API_BASE}/${city}/recent`;
  const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  const data = await r.json();
  return extractRows(data);
}

export async function fetchHealth() {
  const url = `${API_BASE}/health`;
  const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}
