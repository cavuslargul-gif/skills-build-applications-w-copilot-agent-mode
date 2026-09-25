import { useEffect, useState } from 'react'
import { collectionFrom } from '../lib/api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(endpoint).then((response) => { if (!response.ok) throw new Error('Unable to load workouts'); return response.json() }).then((payload) => setWorkouts(collectionFrom(payload))).catch((requestError) => setError(requestError.message)) }, [])
  return <section><div className="page-heading"><p className="kicker">Personalized suggestions</p><h1>Workouts</h1><p className="lede">Choose a session that fits the energy you have today.</p></div>{error ? <div className="error-box">{error}</div> : <div className="card-grid workout-grid">{workouts.map((workout) => <article className="info-card" key={workout._id}><div className="workout-top"><span className="tag">{workout.category}</span><span className="duration">{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.difficulty}</span><span className="text-link">Start <span aria-hidden="true">-&gt;</span></span></footer></article>)}{!workouts.length && <div className="empty-state">No workouts yet.</div>}</div>}</section>
}

export default Workouts