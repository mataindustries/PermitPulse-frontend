import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'

export default function App() {
  return (
    <div style={{ minHeight:'100vh', background:'#0b1118', color:'#e9f0ff', display:'flex', flexDirection:'column' }}>
      <Navbar />
      <div style={{ padding:'16px', textAlign:'center' }}>
        <h1 style={{ fontSize:26, fontWeight:700, margin:'8px 0' }}>PermitPulse</h1>
        <p style={{ opacity:0.8 }}>Your one-stop dashboard for tracking local building permits.</p>
      </div>
      <div style={{ flex:1, padding:'16px' }}>
        <Home />
      </div>
      <footer style={{ padding:'12px', textAlign:'center', fontSize:12, opacity:0.6, borderTop:'1px solid #1f2732' }}>
        © {new Date().getFullYear()} PermitPulse. All rights reserved.
      </footer>
    </div>
  )
}
