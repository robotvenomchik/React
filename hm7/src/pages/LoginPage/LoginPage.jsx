import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from '../../store/useStore'
import { loginSchema } from '../../utils/validationSchemas'
import './LoginPage.css'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useStore(state => state.login)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      login('fake-token')
      const from = location.state?.from?.pathname || '/flights'
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    }
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            {...register('username')}
            type="text"
            placeholder="Username"
            aria-invalid={errors.username ? 'true' : 'false'}
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}