import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV               : z.enum(['development', 'production', 'test']).default('development'),
  PORT                   : z.coerce.number().default(8080),
  DATABASE_URL           : z.string().url().default('postgresql://postgres:postgres@localhost:5432/deep_origin'),
  FRONTEND_BASE_URL      : z.string().url().default('http://localhost:3000'),
  FRONTEND_NOT_FOUND_URL : z.string().url().default('http://localhost:3000/not-found'),
  JWT_SECRET             : z.string().min(8),
  JWT_EXPIRES_IN         : z.string().default('1d'),

});
export type EnvVars = z.infer<typeof envSchema>;
