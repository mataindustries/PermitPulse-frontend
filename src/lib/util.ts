export type SortDir = 'asc' | 'desc';
export function valToStr(v: any): string { return (v ?? '').toString().toLowerCase(); }
export function matchesQuery(row: Record<string,any>, q: string) {
  if (!q) return true;
  const s = q.trim().toLowerCase();
  return Object.values(row).some(v => valToStr(v).includes(s));
}
function asNumber(v:any){ const n=Number(v); return Number.isFinite(n)?n:null; }
function asDate(v:any){ const s=String(v||''); const d=Date.parse(s); return Number.isFinite(d)?d:null; }
export function smartCompare(a:any,b:any): number {
  if (a==null && b==null) return 0; if (a==null) return -1; if (b==null) return 1;
  const na=asNumber(a), nb=asNumber(b); if (na!=null && nb!=null) return na-nb;
  const da=asDate(a), db=asDate(b); if (da!=null && db!=null) return da-db;
  return valToStr(a).localeCompare(valToStr(b));
}
