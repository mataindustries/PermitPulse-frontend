export default function Navbar() {
  return (
    <div style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'12px 16px', borderBottom:'1px solid #1f2732', marginBottom:12
    }}>
      <div style={{ fontWeight:700, fontSize:22 }}>PermitPulse</div>
      <div style={{ fontSize:12, opacity:0.7 }}>React + Vite · Cloudflare Pages</div>
    </div>
  );
}
