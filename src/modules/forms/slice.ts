import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Form } from './types';

const INITIAL_STATE: Form[] = [];

export const { reducer: formsReducer, actions: formsActions } = createSlice({
  name: 'forms',
  initialState: INITIAL_STATE,
  reducers: {
    createForm(state, action: PayloadAction<Form>) {
      state.push(action.payload);

      console.log('create', state, action);
    },
  },
});
