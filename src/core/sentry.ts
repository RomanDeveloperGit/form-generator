import * as Sentry from '@sentry/browser';

export const initSentry = () =>
  Sentry.init({
    dsn: import.meta.env.VITE_APP_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: [
          'localhost',
          /^https:\/\/yourserver\.io\/api/,
        ],
      }),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
