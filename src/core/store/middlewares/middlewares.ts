import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { listenerMiddleware } from './listener-middleware';
import { singletonApis } from './singleton-apis';

export const middlewares = getDefaultMiddleware({
  thunk: {
    extraArgument: singletonApis,
  },
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}).concat(listenerMiddleware.middleware);
