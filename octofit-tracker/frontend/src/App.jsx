import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <img src="/docs/octofitapp-small.png" alt="OctoFit Tracker" />
          <span>OctoFit Tracker</span>
        </NavLink>
        <span className="eyebrow">Mergington High School</span>
      </header>
      <div className="app-layout">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="sidebar-label">Workspace</p>
          <nav className="nav-list">
            <NavLink end to="/">Overview</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <div className="page-heading">
        <p className="kicker">Weekly pulse</p>
        <h1>Move with purpose.</h1>
        <p className="lede">A clear view of the people, teams, and momentum behind Mergington&apos;s fitness challenge.</p>
      </div>
      <div className="stat-grid">
        <div className="stat-card coral"><span>01</span><strong>Log activities</strong><p>Turn effort into a visible streak.</p></div>
        <div className="stat-card mint"><span>02</span><strong>Find your crew</strong><p>Build momentum with your team.</p></div>
        <div className="stat-card ink"><span>03</span><strong>Climb the board</strong><p>Every session adds up.</p></div>
      </div>
      <div className="overview-note">
        <span className="pulse-dot" />
        <div><strong>Today&apos;s focus</strong><p>Small, repeatable wins beat heroic one-offs.</p></div>
        <NavLink className="text-link" to="/workouts">Browse workouts <span aria-hidden="true">-&gt;</span></NavLink>
      </div>
    </section>
  )
}

export default App