import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Field, Form } from './types';

const INITIAL_STATE: Form[] = [];

export const { reducer: formsReducer, actions: formsActions } = createSlice({
  name: 'forms',
  initialState: INITIAL_STATE,
  reducers: {
    createForm(state, action: PayloadAction<Form>) {
      state.push(action.payload);
    },
    renameForm(
      state,
      action: PayloadAction<{ id: Form['id']; newName: Form['name'] }>,
    ) {
      const formIndex = state.findIndex(
        (form) => form.id === action.payload.id,
      );

      if (formIndex !== -1) {
        state[formIndex].name = action.payload.newName;
      }
    },
    deleteForm(state, action: PayloadAction<Form['id']>) {
      const formIndex = state.findIndex((form) => form.id === action.payload);

      if (formIndex !== -1) {
        state.splice(formIndex, 1);
      }
    },
    createField(
      state,
      action: PayloadAction<{ formId: Form['id']; field: Field }>,
    ) {
      const formIndex = state.findIndex(
        (form) => form.id === action.payload.formId,
      );

      // можно ли через find найти и мутировать его?

      if (formIndex !== -1) {
        state[formIndex].fields.push(action.payload.field);
      }
    },
    deleteAllFields(state, action: PayloadAction<{ formId: Form['id'] }>) {
      const formIndex = state.findIndex(
        (form) => form.id === action.payload.formId,
      );

      if (formIndex !== -1) {
        state[formIndex].fields = [];
      }
    },
  },
});
