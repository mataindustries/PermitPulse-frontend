import { useEffect, useMemo, useState } from 'react'
import CityButtons from '@/components/CityButtons'
import HealthCard from '@/components/HealthCard'
import PermitTable from '@/components/PermitTable'
import { CityKey, fetchRecent, fetchHealth, Permit } from '@/lib/api'

export default function Home() {
  const [city, setCity] = useState<CityKey | null>(null)
  const [permits, setPermits] = useState<Permit[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)

  const [health, setHealth] = useState<any|null>(null)
  const [healthLoading, setHealthLoading] = useState(false)
  const [healthError, setHealthError] = useState<string|null>(null)

  const cityTitle = useMemo(() => {
    if (!city) return 'Choose a city';
    const map: Record<CityKey,string> = {
      weho: 'West Hollywood',
      beverlyhills: 'Beverly Hills',
      altadena: 'Altadena',
      palisades: 'Pacific Palisades'
    }
    return map[city];
  }, [city])

  async function loadCity(c: CityKey) {
    setCity(c)
    setLoading(true); setError(null)
    try {
      const data = await fetchRecent(c)
      setPermits(data)
    } catch (e: any) {
      setError(e?.message || 'Failed to load')
      setPermits([])
    } finally {
      setLoading(false)
    }
  }

  async function loadHealth() {
    setHealthLoading(true); setHealthError(null)
    try {
      const data = await fetchHealth()
      setHealth(data)
    } catch (e: any) {
      setHealthError(e?.message || 'Failed')
      setHealth(null)
    } finally {
      setHealthLoading(false)
    }
  }

  useEffect(() => { loadHealth() }, [])

  return (
    <div style={{maxWidth:1100, margin:'0 auto', padding:'16px'}}>
      <div style={{display:'grid', gap:16}}>
        <div>
          <CityButtons active={city} onSelect={loadCity} />
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:16}}>
          <div>
            <h2 style={{margin:'6px 0 12px', fontSize:18}}>{cityTitle}</h2>
            {loading ? <div>Loading permits…</div> : error ? (
              <div style={{color:'#ff6b6b'}}>Error: {error}</div>
            ) : (
              <PermitTable rows={permits} />
            )}
          </div>

          <HealthCard loading={healthLoading} error={healthError} data={health} onRefresh={loadHealth}/>
        </div>
      </div>
    </div>
  )
}
