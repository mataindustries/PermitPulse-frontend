import { useEffect, useState } from 'react';
import CityButtons from '@/components/CityButtons';
import PermitTable from '@/components/PermitTable';
import HealthCard from '@/components/HealthCard';
import { fetchRecent, type CityKey, type Permit } from '@/lib/api';
import WaitlistModal from '@/components/WaitlistModal';

export default function Home() {
  const [city, setCity] = useState<CityKey>('combined'); // default
  const [rows, setRows] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|null>(null);
  const [ts, setTs] = useState<string>('');
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  async function load(c: CityKey) {
    try {
      setLoading(true); setErr(null);
      const data = await fetchRecent(c);
      setRows(data);
      setTs(new Date().toLocaleString());
    } catch (e:any) {
      setErr(e?.message || 'Failed to fetch');
      setRows([]);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(city); }, [city]);

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:16 }}>
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
          <CityButtons value={city} onChange={(v)=>setCity(v as CityKey)} />
          <button onClick={()=>setWaitlistOpen(true)} style={{ marginLeft:'auto', padding:'8px 12px', borderRadius:10, border:'1px solid #1f2732', background:'#0d141c', color:'#dbe7ff' }}>
            Join Waitlist
          </button>
        </div>

        <h2 style={{ margin:'8px 0 10px' }}>
          {city === 'combined' ? 'All Cities' : city === 'weho' ? 'West Hollywood' :
           city === 'beverlyhills' ? 'Beverly Hills' :
           city === 'altadena' ? 'Altadena' : 'Pacific Palisades'}
        </h2>
        <div style={{ fontSize:12, opacity:0.8, marginBottom:8 }}>
          {ts ? `Last updated: ${ts}` : ''}
        </div>

        <PermitTable rows={rows} loading={loading} error={err} showCity={city==='combined'} />
      </div>

      <HealthCard />

      {waitlistOpen && <WaitlistModal onClose={()=>setWaitlistOpen(false)} />}
    </div>
  );
}
