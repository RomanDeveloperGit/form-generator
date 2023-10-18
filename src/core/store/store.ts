import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/lib/persistReducer';

import { middlewares } from './middlewares/middlewares';
import { PERSIST_CONFIG } from './persist-config';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: persistReducer(PERSIST_CONFIG, rootReducer),
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
