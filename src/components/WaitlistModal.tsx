import { useState } from 'react';
import { joinWaitlist, type CityKey } from '@/lib/api';

export default function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [city, setCity] = useState<CityKey>('weho');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string|null>(null);
  const [err, setErr] = useState<string|null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true); setMsg(null); setErr(null);
    try {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Invalid email');
      const res = await joinWaitlist(city === 'combined' ? 'weho' : city, email);
      setMsg('Thanks — you’re on the list!');
      setEmail('');
      setTimeout(onClose, 1200);
      return res;
    } catch (e:any) {
      setErr(e?.message || 'Failed to join');
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'grid',
      placeItems:'center', zIndex:50, padding:16
    }}
      onClick={(e)=>{ if (e.target===e.currentTarget) onClose(); }}
    >
      <form onSubmit={submit}
        style={{
          width:'min(520px, 100%)', background:'#0b1118', color:'#e9f0ff',
          border:'1px solid #1f2732', borderRadius:16, padding:16, boxShadow:'0 8px 30px rgba(0,0,0,0.35)'
        }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <h3 style={{ margin:0 }}>Join the Waitlist</h3>
          <button type="button" onClick={onClose}
            style={{ background:'transparent', border:'none', color:'#b6c4de', fontSize:18 }}>✕</button>
        </div>

        <label style={{ display:'block', fontSize:12, opacity:0.8 }}>City</label>
        <select value={city} onChange={e=>setCity(e.target.value as CityKey)}
          style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid #1f2732',
                   background:'#0d141c', color:'#dbe7ff', marginBottom:12 }}>
          <option value="weho">West Hollywood</option>
          <option value="beverlyhills">Beverly Hills</option>
          <option value="altadena">Altadena</option>
          <option value="palisades">Palisades</option>
          <option value="combined">Combined (choose city for email)</option>
        </select>

        <label style={{ display:'block', fontSize:12, opacity:0.8 }}>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)}
          placeholder="you@company.com"
          style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid #1f2732',
                   background:'#0d141c', color:'#dbe7ff', marginBottom:12 }} />

        {msg && <div style={{ color:'#8bffa6', marginBottom:10 }}>{msg}</div>}
        {err && <div style={{ color:'#ff7b7b', marginBottom:10 }}>Error: {err}</div>}

        <button disabled={sending}
          style={{ width:'100%', padding:'10px 12px', borderRadius:10,
                   border:'1px solid #27435e', background:'#122035', color:'#dbe7ff' }}>
          {sending ? 'Joining…' : 'Join Waitlist'}
        </button>
      </form>
    </div>
  );
}
