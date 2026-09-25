import { useEffect, useState } from 'react'
import { collectionFrom } from '../lib/api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load activities')
        return response.json()
      })
      .then((payload) => setActivities(collectionFrom(payload)))
      .catch((requestError) => setError(requestError.message))
  }, [])

  return <ResourcePage eyebrow="Movement log" title="Activities" description="Recent sessions across the OctoFit community." error={error}>
    <div className="data-table">
      <div className="table-row table-heading"><span>Type</span><span>Duration</span><span>Distance</span><span>Points</span></div>
      {activities.map((activity) => <div className="table-row" key={activity._id}><span className="strong-cell">{activity.type}</span><span>{activity.durationMinutes} min</span><span>{activity.distanceKm ? `${activity.distanceKm} km` : 'Strength'}</span><span className="points">+{activity.points}</span></div>)}
      {!activities.length && !error && <EmptyState />}
    </div>
  </ResourcePage>
}

function ResourcePage({ eyebrow, title, description, error, children }) {
  return <section><div className="page-heading"><p className="kicker">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></div>{error ? <div className="error-box">{error}</div> : children}</section>
}

function EmptyState() { return <div className="empty-state">No records yet.</div> }

export default Activities