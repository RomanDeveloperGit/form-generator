import { createListenerMiddleware } from '@reduxjs/toolkit';

import { startFormsListeners } from '@/modules/forms';

import { singletonApis } from './singleton-apis';

const listenerMiddleware = createListenerMiddleware({
  extra: singletonApis,
});

startFormsListeners(listenerMiddleware as AppListenerMiddleware);
// START OTHER LISTENERS ...

export { listenerMiddleware };
