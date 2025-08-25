export default function HealthCard(props: {
  loading: boolean;
  error: string | null;
  data: any | null;
  onRefresh: () => void;
}) {
  return (
    <div style={{
      border:'1px solid #1b2430', borderRadius:12, padding:16, background:'#0e131b'
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <h3 style={{margin:0, fontSize:16}}>Health</h3>
        <button onClick={props.onRefresh} style={{
          padding:'6px 10px', borderRadius:8, border:'1px solid #1b2430', background:'#0b0f14', color:'#e7edf3', cursor:'pointer'
        }}>Refresh</button>
      </div>
      {props.loading && <div>Checking…</div>}
      {props.error && <div style={{color:'#ff6b6b'}}>Error: {props.error}</div>}
      {!props.loading && !props.error && props.data && (
        <pre style={{margin:0, whiteSpace:'pre-wrap', wordBreak:'break-word', opacity:0.9}}>
{JSON.stringify(props.data, null, 2)}
        </pre>
      )}
    </div>
  );
}
