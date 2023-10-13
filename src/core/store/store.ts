import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
import { middlewares } from './middlewares';

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});
