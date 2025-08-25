export default function Navbar() {
  return (
    <header style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'12px 16px', borderBottom:'1px solid #1b2430', background:'#0e131b',
      position:'sticky', top:0, zIndex:10
    }}>
      <div style={{fontWeight:700, letterSpacing:0.3, fontSize:18}}>
        PermitPulse
      </div>
      <div style={{opacity:0.7, fontSize:12}}>React + Vite · Cloudflare Pages</div>
    </header>
  );
}
