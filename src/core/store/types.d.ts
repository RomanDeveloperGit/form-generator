import { singletonApis } from './middlewares';
import { store } from './store';

declare global {
  type AppState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
  type AppThunkApiConfig = {
    extra: typeof singletonApis;
    getState: () => AppState;
  };
}
