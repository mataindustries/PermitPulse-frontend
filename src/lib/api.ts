// src/lib/api.ts
const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE ||
    (typeof window !== 'undefined' ? (window as any).__API_BASE__ : '') ||
      'https://api.getpermitpulse.com';

      export type CityKey =
        | 'weho'
          | 'beverlyhills'
            | 'palisades'
              | 'altadena'
                | 'sandiego'
                  | 'sacramento'
                    | 'combined';

                    export type Permit = Record<string, unknown>;

                    function looksJson(resp: Response) {
                      const ct = resp.headers.get('content-type') || '';
                        return ct.includes('application/json') || ct.includes('json');
                        }

                        async function fetchJSON(url: string): Promise<any> {
                          let r = await fetch(url, { headers: { Accept: 'application/json' } });
                            if (!r.ok) throw new Error(String(r.status));
                              return looksJson(r) ? r.json() : JSON.parse(await r.text());
                              }

                              function extractRows(data: any): Permit[] {
                                if (!data) return [];
                                  if (Array.isArray(data)) return data;
                                    if (Array.isArray(data?.permits)) return data.permits;
                                      if (Array.isArray(data?.results)) return data.results;
                                        if (Array.isArray(data?.data)) return data.data;
                                          if (Array.isArray(data?.payload)) return data.payload;
                                            if (Array.isArray(data?.rows)) return data.rows;
                                              return [];
                                              }

                                              export async function fetchRecent(city: CityKey): Promise<Permit[]> {
                                                const base = API_BASE.replace(/\/+$/, '');
                                                  const url =
                                                      city === 'combined'
                                                            ? `${base}/combined/recent`
                                                                  : `${base}/${city}/recent`;
                                                                    const data = await fetchJSON(url);
                                                                      return extractRows(data);
                                                                      }

                                                                      export async function fetchHealth() {
                                                                        const base = API_BASE.replace(/\/+$/, '');
                                                                          return fetchJSON(`${base}/health`);
                                                                          }
