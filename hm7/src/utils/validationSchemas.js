import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export const searchFlightsSchema = z.object({
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
})

export const bookingSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  confirmAgreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the booking terms',
  }),
}) 