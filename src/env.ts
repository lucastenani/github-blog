import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
  VITE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
})

export const env = envSchema.parse(import.meta.env)
