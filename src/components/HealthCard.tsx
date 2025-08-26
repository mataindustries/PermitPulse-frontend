import { useEffect, useState } from 'react';
import { fetchHealth } from '@/lib/api';
import Spinner from '@/components/Spinner';

export default function HealthCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string|null>(null);
  const [ts, setTs] = useState<string>('');

  async function load() {
    try {
      setLoading(true); setErr(null);
      const d = await fetchHealth();
      setData(d);
      setTs(new Date().toLocaleString());
    } catch (e:any) {
      setErr(e?.message || 'Failed');
      setData(null);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const healthy = data?.ok ?? false;

  return (
    <div style={{ border:'1px solid #1f2732', borderRadius:14, padding:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h3 style={{ margin:0 }}>System Health</h3>
        <button onClick={load} style={{ padding:'6px 10px', borderRadius:8, background:'#0d141c', color:'#cfe1ff', border:'1px solid #1f2732' }}>
          {loading ? <Spinner size={14}/> : 'Refresh'}
        </button>
      </div>
      <div style={{ fontSize:12, opacity:0.8, marginTop:6 }}>
        {ts ? `Last checked: ${ts}` : null}
      </div>
      <div style={{ marginTop:10 }}>
        {loading && <div><Spinner /> Checking…</div>}
        {err && <div style={{ color:'#ff6b6b' }}>Error: {err}</div>}
        {!loading && !err && (
          <div style={{ fontSize:16 }}>
            {healthy ? <span style={{ color:'#7fff9f' }}>✅ Online</span> : <span style={{ color:'#ff6b6b' }}>❌ Offline</span>}
          </div>
        )}
      </div>
    </div>
  );
}
