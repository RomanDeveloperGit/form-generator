import { createSelector } from '@reduxjs/toolkit';

export const getAllForms = (state: AppState) => state.forms;
export const getFormById = createSelector(
  (id: string) => id,
  getAllForms,
  (id, forms) => forms.find((form) => form.id === id),
);

export const isFormExistByName = createSelector(
  (_: AppState, name: string) => name,
  getAllForms,
  (name, forms) => forms.some((form) => form.name === name),
);
