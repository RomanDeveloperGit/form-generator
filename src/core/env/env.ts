import { z } from 'zod';

export const envSchema = z.object({
  VITE_APP_SENTRY_AUTH_TOKEN: z.string(),
  VITE_APP_SENTRY_DSN: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const checkEnv = () => {
  envSchema.parse(import.meta.env);
};
