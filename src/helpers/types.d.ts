import { ListenerMiddlewareInstance } from '@reduxjs/toolkit';

import { singletonApis } from '@/core/store/middlewares/middlewares';
import { store } from '@/core/store/store';

declare global {
  type AppState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
  type AppSingletonApis = typeof singletonApis;
  type AppThunkApiConfig = {
    extra: AppSingletonApis;
    getState: () => AppState;
  };
  type AppListenerMiddleware = ListenerMiddlewareInstance<
    AppState,
    AppDispatch,
    AppSingletonApis
  >;
}
