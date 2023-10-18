import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Field, Form, FormId } from './types';

const INITIAL_STATE: Form[] = [];

export const { reducer: formsReducer, actions: formsActions } = createSlice({
  name: 'forms',
  initialState: INITIAL_STATE,
  reducers: {
    createForm(state, action: PayloadAction<Form>) {
      state.push(action.payload);
    },
    renameForm(state, action: PayloadAction<{ id: FormId; newName: string }>) {
      const formIndex = state.findIndex(
        (form) => form.id === action.payload.id,
      );

      if (formIndex !== -1) {
        state[formIndex].name = action.payload.newName;
      }
    },
    deleteForm(state, action: PayloadAction<FormId>) {
      const formIndex = state.findIndex((form) => form.id === action.payload);

      if (formIndex !== -1) {
        state.splice(formIndex, 1);
      }
    },
    createField(
      state,
      action: PayloadAction<{ formId: FormId; field: Field }>,
    ) {
      const formIndex = state.findIndex(
        (form) => form.id === action.payload.formId,
      );

      // можно ли через find найти и мутировать его?

      if (formIndex !== -1) {
        state[formIndex].fields.push(action.payload.field);
      }
    },
    deleteAllFields(state, action: PayloadAction<{ formId: FormId }>) {
      const formIndex = state.findIndex(
        (form) => form.id === action.payload.formId,
      );

      if (formIndex !== -1) {
        state[formIndex].fields = [];
      }
    },
  },
});
