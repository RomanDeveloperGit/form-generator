import { isRejected } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/browser';

import { isExpectedError } from '@/libs/errors';

export const startErrorsListeners = (
  listenerMiddleware: AppListenerMiddleware,
) => {
  listenerMiddleware.startListening({
    matcher: isRejected,
    effect: (action) => {
      if (!isExpectedError(action.payload)) {
        Sentry.captureException(action);
      }
    },
  });
};
