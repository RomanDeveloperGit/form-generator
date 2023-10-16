import { combineReducers } from '@reduxjs/toolkit';

import { formsReducer } from '@/modules/forms';

export const rootReducer = combineReducers({
  forms: formsReducer,
});
