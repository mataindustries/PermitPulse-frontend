import { useEffect, useMemo, useState } from 'react';
import CityButtons from '@/components/CityButtons';
import PermitTable from '@/components/PermitTable';
import HealthCard from '@/components/HealthCard';
import SearchBar from '@/components/SearchBar';
import PermitTrend from '@/components/PermitTrend';
import CityStats from '@/components/CityStats';
import { fetchRecent, type CityKey, type Permit } from '@/lib/api';
import { matchesQuery, smartCompare, type SortDir } from '@/lib/util';
import WaitlistModal from '@/components/WaitlistModal';

export default function Home() {
  const [city, setCity] = useState<CityKey>('combined');
  const [rows, setRows] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|null>(null);
  const [ts, setTs] = useState<string>('');
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const [q, setQ] = useState('');
  const [sortKey, setSortKey] = useState<string|null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  async function load(c: CityKey) {
    try {
      setLoading(true); setErr(null);
      const data = await fetchRecent(c);
      setRows(data);
      setTs(new Date().toLocaleString());
      const keys = Object.keys(data[0] || {});
      const pref = ['status_date','issued_date','issue_date','status','permit_number'];
      const first = pref.find(p=>keys.includes(p)) || keys[0] || null;
      setSortKey(first);
      setSortDir('desc');
    } catch (e:any) {
      setErr(e?.message || 'Failed to fetch');
      setRows([]);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(city); }, [city]);

  const viewRows = useMemo(() => {
    let r = rows;
    if (q) r = r.filter(row => matchesQuery(row, q));
    if (sortKey) {
      r = [...r].sort((a,b) => {
        const cmp = smartCompare(a[sortKey!], b[sortKey!]);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return r;
  }, [rows, q, sortKey, sortDir]);

  function handleSort(col: string) {
    if (col === sortKey) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col);
      setSortDir('desc');
    }
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:16 }}>
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12, flexWrap:'wrap' }}>
          <CityButtons value={city} onChange={(v)=>setCity(v as CityKey)} />
          <SearchBar value={q} onChange={setQ} />
        </div>

        <h2 style={{ margin:'8px 0 10px' }}>
          {city === 'combined' ? 'All Cities' : city === 'weho' ? 'West Hollywood' :
           city === 'beverlyhills' ? 'Beverly Hills' :
           city === 'altadena' ? 'Altadena' : 'Pacific Palisades'}
        </h2>
        <div style={{ fontSize:12, opacity:0.8, marginBottom:8 }}>
          {ts ? `Last updated: ${ts}` : ''}
          {q ? ` · filter: "${q}"` : ''}
          {sortKey ? ` · sort: ${sortKey} (${sortDir})` : ''}
        </div>

        <CityStats rows={viewRows} />
        <PermitTrend rows={viewRows} />

        <PermitTable
          rows={viewRows}
          loading={loading}
          error={err}
          showCity={city==='combined'}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />
      </div>

      <HealthCard />
      {waitlistOpen && <WaitlistModal onClose={()=>setWaitlistOpen(false)} />}
    </div>
  );
}
