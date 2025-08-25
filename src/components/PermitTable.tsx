import { Permit } from '@/lib/api';

function fmt(v: unknown) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  return JSON.stringify(v);
}

export default function PermitTable({ rows }: { rows: Permit[] }) {
  if (!rows?.length) {
    return <div style={{opacity:0.8}}>No permits yet.</div>;
  }

  const preferred = ['permit_number','permit','case_number','status','issue_date','issued_date','status_date','address','work_description','description','project_description'];
  const keys = Array.from(new Set(preferred.concat(Object.keys(rows[0] as object)))).slice(0, 8);

  return (
    <div style={{overflowX:'auto', border:'1px solid #1b2430', borderRadius:12}}>
      <table style={{borderCollapse:'collapse', width:'100%', minWidth:720}}>
        <thead style={{background:'#0e1a26'}}>
          <tr>
            {keys.map(k => (
              <th key={k} style={{textAlign:'left', padding:'10px 12px', borderBottom:'1px solid #1b2430', fontWeight:700}}>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{background: i%2? '#0c131b' : '#0a1118'}}>
              {keys.map(k => (
                <td key={k} style={{padding:'10px 12px', borderBottom:'1px solid #111a23', verticalAlign:'top'}}>
                  {fmt((r as any)[k])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
