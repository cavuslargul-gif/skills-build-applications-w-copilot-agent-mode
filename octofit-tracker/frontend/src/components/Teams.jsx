import { useEffect, useState } from 'react'
import { collectionFrom } from '../lib/api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(endpoint).then((response) => { if (!response.ok) throw new Error('Unable to load teams'); return response.json() }).then((payload) => setTeams(collectionFrom(payload))).catch((requestError) => setError(requestError.message)) }, [])
  return <section><div className="page-heading"><p className="kicker">Find your people</p><h1>Teams</h1><p className="lede">Friendly competition works better when everyone has a place to belong.</p></div>{error ? <div className="error-box">{error}</div> : <div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id}><div className="card-mark">{team.name.slice(0, 1)}</div><h2>{team.name}</h2><p>{team.description}</p><footer><span>{team.members?.length || 0} members</span><strong>{team.points} pts</strong></footer></article>)}{!teams.length && <div className="empty-state">No teams yet.</div>}</div>}</section>
}

export default Teams