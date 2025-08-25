import { CityKey } from '@/lib/api';

const cities: { key: CityKey; label: string }[] = [
  { key: 'weho', label: 'WeHo' },
  { key: 'beverlyhills', label: 'Beverly Hills' },
  { key: 'altadena', label: 'Altadena' },
  { key: 'palisades', label: 'Palisades' },
];

export default function CityButtons(props: {
  active?: CityKey | null;
  onSelect: (key: CityKey) => void;
}) {
  return (
    <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
      {cities.map(c => {
        const active = props.active === c.key;
        return (
          <button
            key={c.key}
            onClick={() => props.onSelect(c.key)}
            style={{
              padding:'8px 12px',
              borderRadius:10,
              border:'1px solid ' + (active ? '#4aa3ff' : '#1b2430'),
              background: active ? '#0b2744' : '#0e131b',
              color:'#e7edf3',
              cursor:'pointer',
              fontWeight:600
            }}>
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
