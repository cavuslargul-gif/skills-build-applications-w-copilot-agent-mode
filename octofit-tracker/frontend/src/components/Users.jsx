import { useEffect, useState } from 'react'
import { collectionFrom } from '../lib/api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(endpoint).then((response) => { if (!response.ok) throw new Error('Unable to load users'); return response.json() }).then((payload) => setUsers(collectionFrom(payload))).catch((requestError) => setError(requestError.message)) }, [])
  return <section><div className="page-heading"><p className="kicker">The community</p><h1>Users</h1><p className="lede">Meet the athletes making movement part of their week.</p></div>{error ? <div className="error-box">{error}</div> : <div className="people-list">{users.map((user) => <div className="person-row" key={user._id}><img src={user.profile?.avatarUrl || '/docs/octofitapp-small.png'} alt="" /><div><strong>{user.name}</strong><span>{user.email}</span></div><em>{user.profile?.fitnessLevel || 'beginner'}</em></div>)}{!users.length && <div className="empty-state">No users yet.</div>}</div>}</section>
}

export default Users