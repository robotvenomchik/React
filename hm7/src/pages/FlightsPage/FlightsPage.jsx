import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { searchFlightsSchema } from '../../utils/validationSchemas'
import { flightService } from '../../api/flightService'
import './FlightsPage.css'

export const FlightsPage = () => {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchFlightsSchema),
    defaultValues: {
      origin: '',
      destination: '',
      departureDate: '',
    },
  })

  const searchParams = watch()

  const { data: flights, isLoading, error } = useQuery({
    queryKey: ['flights', searchParams],
    queryFn: () => flightService.getFlights(searchParams),
  })

  const onSubmit = (data) => {
    console.log('Search submitted:', data)
  }

  if (isLoading) return <div className="flights-page">Loading flights...</div>
  if (error) return <div className="flights-page error">Error loading flights: {error.message}</div>

  return (
    <div className="flights-page">
      <h2>Search Flights</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            {...register('origin')}
            type="text"
            placeholder="From"
            aria-invalid={errors.origin ? 'true' : 'false'}
          />
          {errors.origin && (
            <span className="error-message">{errors.origin.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            {...register('destination')}
            type="text"
            placeholder="To"
            aria-invalid={errors.destination ? 'true' : 'false'}
          />
          {errors.destination && (
            <span className="error-message">{errors.destination.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            {...register('departureDate')}
            type="date"
            aria-invalid={errors.departureDate ? 'true' : 'false'}
          />
          {errors.departureDate && (
            <span className="error-message">{errors.departureDate.message}</span>
          )}
        </div>

        <button type="submit">Search</button>
      </form>

      <div className="flights-list">
        {flights?.length === 0 ? (
          <p className="no-flights">No flights found matching your criteria</p>
        ) : (
          flights?.map(flight => (
            <div key={flight.id} className="flight-card">
              <h3>Flight {flight.flightNumber}</h3>
              <div className="flight-details">
                <p><strong>From:</strong> {flight.origin}</p>
                <p><strong>To:</strong> {flight.destination}</p>
                <p><strong>Date:</strong> {flight.departureDate}</p>
                <p><strong>Time:</strong> {flight.departureTime} - {flight.arrivalTime}</p>
                <p><strong>Price:</strong> ${flight.price}</p>
                <p><strong>Available Seats:</strong> {flight.availableSeats}</p>
                <p><strong>Airline:</strong> {flight.airline}</p>
              </div>
              <button 
                onClick={() => navigate(`/flights/${flight.id}`)}
                disabled={flight.availableSeats === 0}
              >
                {flight.availableSeats === 0 ? 'No Seats Available' : 'Book Now'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}