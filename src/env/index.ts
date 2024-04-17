import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.number().default(3333),
  NODE_ENV: z.string().default('development'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new Error('Invalid environment variables')
}

export const env = _env.data