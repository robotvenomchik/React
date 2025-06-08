import axios from 'axios'

const API_URL = 'https://680fc8ae27f2fdac240f60df.mockapi.io/flights'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status)
    return response
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

export const flightService = {
  getFlights: async (searchParams = {}) => {
    try {
      const { data } = await api.get('')
      return data.filter(flight => {
        if (!searchParams.origin && !searchParams.destination && !searchParams.departureDate) {
          return true
        }
        return (
          (!searchParams.origin || flight.origin.toLowerCase().includes(searchParams.origin.toLowerCase())) &&
          (!searchParams.destination || flight.destination.toLowerCase().includes(searchParams.destination.toLowerCase())) &&
          (!searchParams.departureDate || flight.departureDate === searchParams.departureDate)
        )
      })
    } catch (error) {
      console.error('Error fetching flights:', error)
      throw new Error('Failed to fetch flights. Please try again later.')
    }
  },

  getFlightById: async (id) => {
    try {
      const { data } = await api.get(`/${id}`)
      return data
    } catch (error) {
      console.error('Error fetching flight details:', error)
      throw new Error('Failed to fetch flight details. Please try again later.')
    }
  },

  updateFlight: async (id, updatedData) => {
    try {
      const { data } = await api.put(`/${id}`, updatedData)
      return data
    } catch (error) {
      console.error('Error updating flight:', error)
      throw new Error('Failed to update flight. Please try again later.')
    }
  },

  bookFlight: async (id) => {
    try {
      const flight = await flightService.getFlightById(id)
      if (flight.availableSeats <= 0) {
        throw new Error('No available seats')
      }
      const updatedFlight = {
        ...flight,
        availableSeats: flight.availableSeats - 1
      }
      return flightService.updateFlight(id, updatedFlight)
    } catch (error) {
      console.error('Error booking flight:', error)
      throw error
    }
  }
} 