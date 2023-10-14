import { createListenerMiddleware } from '@reduxjs/toolkit';

import { startFormsListeners } from '@/modules/forms';

import { singletonApis } from './signleton-apis';

const listenerMiddleware = createListenerMiddleware({
  extra: singletonApis,
});

startFormsListeners(listenerMiddleware as AppListenerMiddleware)
// START OTHER LISTENERS ...

export { listenerMiddleware };
