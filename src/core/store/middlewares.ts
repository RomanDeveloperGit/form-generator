import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { metricsApi } from '@/modules/metrics';
import { notificationsApi } from '@/modules/notifications';

export const SIGNLETON_APIS = {
  metricsApi,
  notificationsApi,
};

export const middlewares = getDefaultMiddleware({
  thunk: {
    extraArgument: SIGNLETON_APIS,
  },
});
