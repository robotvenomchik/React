import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import './Header.css'

export const Header = () => {
  const navigate = useNavigate()
  const isAuthenticated = useStore(state => state.isAuthenticated)
  const logout = useStore(state => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isAuthenticated) return null

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/flights">Flights</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  )
}
 