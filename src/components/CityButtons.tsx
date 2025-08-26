type Props = {
  value: string;
  onChange: (v: string) => void;
};

const items: { key: string; label: string }[] = [
  { key: 'weho', label: 'WeHo' },
  { key: 'beverlyhills', label: 'Beverly Hills' },
  { key: 'altadena', label: 'Altadena' },
  { key: 'palisades', label: 'Palisades' },
  { key: 'combined', label: 'Combined' },
];

export default function CityButtons({ value, onChange }: Props) {
  return (
    <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
      {items.map(it => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          style={{
            padding:'10px 14px',
            borderRadius:12,
            border:'1px solid #1f2732',
            background: value === it.key ? '#122035' : '#0d141c',
            color:'#dbe7ff'
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
