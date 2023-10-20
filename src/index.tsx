import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { App, AppLoader, checkEnv, initSentry, persistor, store } from '@/core';

checkEnv();
initSentry();

// коммит на внедрение сентри
// убрать утилсы, хелперы и константы - заменить на либс

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<AppLoader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
