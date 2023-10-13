import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { sendMetric } from '@/modules/metrics';

export const singletones = {
  sendMetric,
  // notification
};

export const middlewares = getDefaultMiddleware({
  thunk: {
    extraArgument: singletones,
  },
});
