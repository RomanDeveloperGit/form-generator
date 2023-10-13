import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { sendMetric } from '@/modules/metrics';

export const singletones = {
  sendMetric,
};

export const middlewares = getDefaultMiddleware({
  thunk: {
    extraArgument: singletones,
  },
});
