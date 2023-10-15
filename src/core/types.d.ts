import { ListenerMiddlewareInstance } from '@reduxjs/toolkit';

import { singletonApis } from '@/core/signleton-apis';

import { store } from './store';

declare global {
  type AppState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
  type AppSingletonApis = typeof singletonApis;
  type AppThunkApiConfig = {
    extra: AppSingletonApis;
    state: AppState;
  };
  type AppListenerMiddleware = ListenerMiddlewareInstance<
    AppState,
    AppDispatch,
    AppSingletonApis
  >;
}
