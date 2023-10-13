import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/lib/persistReducer';

import { PERSIST_CONFIG } from './persist-config';
import { rootReducer } from './root-reducer';
import { middlewares } from './middlewares';

export const store = configureStore({
  reducer: persistReducer(PERSIST_CONFIG, rootReducer),
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
