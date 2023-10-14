import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { singletonApis } from './signleton-apis';
import { listenerMiddleware } from './listeners';

export const middlewares = getDefaultMiddleware({
  thunk: {
    extraArgument: singletonApis,
  },
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}).concat(listenerMiddleware.middleware);
