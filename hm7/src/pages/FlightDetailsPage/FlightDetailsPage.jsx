import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingSchema } from '../../utils/validationSchemas'
import { flightService } from '../../api/flightService'
import './FlightDetailsPage.css'

export const FlightDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      confirmAgreement: false,
    },
  })

  const { data: flight, isLoading, error } = useQuery({
    queryKey: ['flight', id],
    queryFn: () => flightService.getFlightById(id),
  })

  const bookMutation = useMutation({
    mutationFn: () => flightService.bookFlight(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights'])
      queryClient.invalidateQueries(['flight', id])
      navigate('/flights', { 
        state: { 
          message: 'Flight booked successfully!' 
        }
      })
    },
  })

  const onSubmit = async (data) => {
    try {
      await bookMutation.mutateAsync()
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to book flight. Please try again.')
    }
  }

  if (isLoading) return <div className="flight-details-page">Loading flight details...</div>
  if (error) return <div className="flight-details-page error">Error loading flight: {error.message}</div>
  if (!flight) return <div className="flight-details-page">Flight not found</div>

  return (
    <div className="flight-details-page">
      <h2>Flight Details</h2>
      
      <div className="flight-info">
        <h3>Flight {flight.flightNumber}</h3>
        <div className="flight-details-grid">
          <div className="detail-group">
            <label>From</label>
            <p>{flight.origin}</p>
          </div>
          <div className="detail-group">
            <label>To</label>
            <p>{flight.destination}</p>
          </div>
          <div className="detail-group">
            <label>Date</label>
            <p>{flight.departureDate}</p>
          </div>
          <div className="detail-group">
            <label>Time</label>
            <p>{flight.departureTime} - {flight.arrivalTime}</p>
          </div>
          <div className="detail-group">
            <label>Price</label>
            <p>${flight.price}</p>
          </div>
          <div className="detail-group">
            <label>Available Seats</label>
            <p>{flight.availableSeats}</p>
          </div>
          <div className="detail-group">
            <label>Airline</label>
            <p>{flight.airline}</p>
          </div>
        </div>
      </div>

      {flight.availableSeats > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
          <h3>Book This Flight</h3>
          
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              {...register('fullName')}
              type="text"
              placeholder="Enter your full name"
              aria-invalid={errors.fullName ? 'true' : 'false'}
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number (Optional)</label>
            <input
              id="phoneNumber"
              {...register('phoneNumber')}
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register('confirmAgreement')}
                aria-invalid={errors.confirmAgreement ? 'true' : 'false'}
              />
              <span>I agree to the booking terms and conditions</span>
            </label>
            {errors.confirmAgreement && (
              <span className="error-message">{errors.confirmAgreement.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || bookMutation.isPending}
            className="book-button"
          >
            {isSubmitting || bookMutation.isPending ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      ) : (
        <div className="no-seats">
          <p>Sorry, this flight is fully booked.</p>
          <button onClick={() => navigate('/flights')}>Search Other Flights</button>
        </div>
      )}
    </div>
  )
} 