import { smartCompare } from '@/lib/util';

type Props = {
  rows: Record<string, any>[];
  loading: boolean;
  error?: string|null;
  showCity?: boolean;
  sortKey?: string|null;
  sortDir?: 'asc'|'desc';
  onSort?: (key: string) => void;
};

export default function PermitTable({
  rows, loading, error, showCity, sortKey, sortDir, onSort
}: Props) {
  if (loading) return <div style={{ padding:8 }}>Loading…</div>;
  if (error) return <div style={{ color:'#ff6b6b' }}>Error: {error}</div>;
  if (!rows?.length) return <div>No permits yet.</div>;

  const colsRaw = Object.keys(rows[0]);
  const ordered = showCity ? (['city', ...colsRaw.filter(c=>c!=='city')]) : colsRaw;

  const arrow = (c:string) => c===sortKey ? (sortDir==='asc' ? ' ▲' : ' ▼') : '';

  return (
    <div style={{ overflowX:'auto', border:'1px solid #1f2732', borderRadius:12 }}>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>
            {ordered.map(c=>(
              <th key={c}
                  onClick={()=>onSort?.(c)}
                  style={{ cursor:'pointer', textAlign:'left', padding:'8px 10px',
                           background:'#0e1620', borderBottom:'1px solid #1f2732', whiteSpace:'nowrap' }}>
                {c}{arrow(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} style={{ borderBottom:'1px solid #13202c' }}>
              {ordered.map(c=>(
                <td key={c} style={{ padding:'8px 10px', verticalAlign:'top' }}>
                  {String(r[c] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
