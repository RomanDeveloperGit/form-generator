import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Form } from '../types';

const INITIAL_STATE: Form[] = [];

export const { reducer: formsListReducer, actions: formsListActions } =
  createSlice({
    name: 'forms/list',
    initialState: INITIAL_STATE,
    reducers: {
      createForm(state, action: PayloadAction<Form>) {
        state.push(action.payload);
      },
    },
  });
