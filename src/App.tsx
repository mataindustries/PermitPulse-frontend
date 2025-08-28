import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ExpansionBanner from "./components/ExpansionBanner";
// ...
<div className="space-y-6">
  <ExpansionBanner />
    {/* the rest of your dashboard cards */}
    </div>
import Home from '@/pages/Home';
import Pricing from '@/pages/Pricing';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
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
