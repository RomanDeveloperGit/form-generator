import { combineReducers } from '@reduxjs/toolkit';

import { formsListReducer } from '@/modules/forms';

export const rootReducer = combineReducers({
  forms: formsListReducer,
});
