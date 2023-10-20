import { EnvSchema } from './env';

declare global {
  type Env = EnvSchema;
}
