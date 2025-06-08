import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../../store/useStore'

export const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = useStore(state => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}