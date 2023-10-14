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
      renameForm(state, action: PayloadAction<Pick<Form, 'id' | 'name'>>) {
        return state.map((form) => {
          if (form.id === action.payload.id) {
            return { ...form, ...action.payload };
          }

          return form;
        });
      },
      deleteForm(state, action: PayloadAction<string>) {
        return state.filter((form) => form.id !== action.payload);
      },
    },
  });
