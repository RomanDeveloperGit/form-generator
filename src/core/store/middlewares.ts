import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

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
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});
