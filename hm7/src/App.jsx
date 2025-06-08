import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import { Header } from './components/Header/Header'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { FlightsPage } from './pages/FlightsPage/FlightsPage'
import { FlightDetailsPage } from './pages/FlightDetailsPage/FlightDetailsPage'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/flights" 
                  element={
                    <PrivateRoute>
                      <FlightsPage />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/flights/:id" 
                  element={
                    <PrivateRoute>
                      <FlightDetailsPage />
                    </PrivateRoute>
                  } 
                />
                <Route path="/" element={<Navigate to="/flights" />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
