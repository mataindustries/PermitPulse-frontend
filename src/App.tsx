import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Pricing from '@/pages/Pricing';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight:'100vh', background:'#0b1118', color:'#e9f0ff',
                   display:'flex', flexDirection:'column' }}>
        <Navbar />
        <div style={{ flex:1, padding:'16px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
