import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { metricsApi } from '@/modules/metrics';
import { notificationsApi } from '@/modules/notifications';

export const singletonApis = {
  metricsApi,
  notificationsApi,
};

export const middlewares = getDefaultMiddleware({
  thunk: {
    extraArgument: singletonApis,
  },
});
