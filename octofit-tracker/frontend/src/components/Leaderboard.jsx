import { useEffect, useState } from 'react'
import { collectionFrom } from '../lib/api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(endpoint).then((response) => { if (!response.ok) throw new Error('Unable to load leaderboard'); return response.json() }).then((payload) => setEntries(collectionFrom(payload))).catch((requestError) => setError(requestError.message)) }, [])
  return <section><div className="page-heading"><p className="kicker">Weekly standings</p><h1>Leaderboard</h1><p className="lede">The latest points race, ranked by consistency.</p></div>{error ? <div className="error-box">{error}</div> : <div className="leader-list">{entries.map((entry) => <div className="leader-row" key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><span className="leader-name">{entry.userId?.name || 'Athlete'}</span><span className="leader-period">{entry.period}</span><strong>{entry.points} pts</strong></div>)}{!entries.length && <div className="empty-state">No standings yet.</div>}</div>}</section>
}

export default Leaderboard