import { useState } from 'react';
import { joinWaitlist, type CityKey } from '@/lib/api';

export default function WaitlistModal({ onClose }: { onClose: ()=>void }) {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState<CityKey>('weho');
  const [msg, setMsg] = useState<string>('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setBusy(true); setMsg('');
      if (city === 'combined') throw new Error('Pick a specific city');
      await joinWaitlist(city as Exclude<CityKey,'combined'>, email);
      setMsg('✅ Thanks! We will notify you.');
      setEmail('');
    } catch (err:any) {
      setMsg('❌ ' + (err?.message || 'Failed'));
    } finally { setBusy(false); }
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', display:'grid', placeItems:'center', zIndex:50 }}>
      <div style={{ width:'min(92vw,420px)', background:'#0d141c', color:'#dbe7ff', border:'1px solid #1f2732', borderRadius:14, padding:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ margin:0 }}>Join Waitlist</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#cfe1ff', fontSize:18 }}>✕</button>
        </div>

        <form onSubmit={submit} style={{ display:'grid', gap:10, marginTop:12 }}>
          <label>Email
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)}
              style={{ width:'100%', marginTop:6, padding:10, borderRadius:10, border:'1px solid #1f2732', background:'#0b1118', color:'#e9f0ff' }}/>
          </label>

          <label>City
            <select value={city} onChange={e=>setCity(e.target.value as CityKey)}
              style={{ width:'100%', marginTop:6, padding:10, borderRadius:10, border:'1px solid #1f2732', background:'#0b1118', color:'#e9f0ff' }}>
              <option value="weho">WeHo</option>
              <option value="beverlyhills">Beverly Hills</option>
              <option value="altadena">Altadena</option>
              <option value="palisades">Palisades</option>
            </select>
          </label>

          <button disabled={busy} type="submit"
            style={{ padding:'10px 12px', borderRadius:10, border:'1px solid #1f2732', background:'#122035', color:'#dbe7ff' }}>
            {busy ? 'Submitting…' : 'Join'}
          </button>

          {msg && <div style={{ fontSize:13 }}>{msg}</div>}
        </form>
      </div>
    </div>
  );
}
