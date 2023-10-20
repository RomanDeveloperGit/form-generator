import { createListenerMiddleware } from '@reduxjs/toolkit';

import { startErrorsListeners } from '@/modules/errors';
import { startFormsListeners } from '@/modules/forms';

import { singletonApis } from './singleton-apis';

const listenerMiddleware = createListenerMiddleware({
  extra: singletonApis,
});

// Это для TS, ибо он ломает типы, если попытаться напрмяую типизировать мидлвару.
const typedListenerMiddleware = listenerMiddleware as AppListenerMiddleware;

startFormsListeners(typedListenerMiddleware);
startErrorsListeners(typedListenerMiddleware);

export { listenerMiddleware };
