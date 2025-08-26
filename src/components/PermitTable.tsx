type Props = {
  rows: Record<string, any>[];
  loading: boolean;
  error?: string|null;
  showCity?: boolean;
};
export default function PermitTable({ rows, loading, error, showCity }: Props) {
  if (loading) return <div style={{ padding:8 }}>Loading…</div>;
  if (error) return <div style={{ color:'#ff6b6b' }}>Error: {error}</div>;
  if (!rows?.length) return <div>No permits yet.</div>;
  const cols = Object.keys(rows[0]);
  const ordered = showCity ? (['city', ...cols.filter(c=>c!=='city')]) : cols;

  return (
    <div style={{ overflowX:'auto', border:'1px solid #1f2732', borderRadius:12 }}>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>{ordered.map(c=>(
            <th key={c} style={{ textAlign:'left', padding:'8px 10px', background:'#0e1620', borderBottom:'1px solid #1f2732' }}>{c}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} style={{ borderBottom:'1px solid #13202c' }}>
              {ordered.map(c=>(
                <td key={c} style={{ padding:'8px 10px', verticalAlign:'top' }}>{String(r[c] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
