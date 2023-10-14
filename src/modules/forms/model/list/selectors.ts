import { createSelector } from '@reduxjs/toolkit';

const getAllForms = (state: AppState) => state.forms;
const getFormById = createSelector(
  (id: string) => id,
  getAllForms,
  (id, forms) => forms.find((form) => form.id === id),
);

const isFormExistByName = createSelector(
  (_: AppState, name: string) => name,
  getAllForms,
  (name, forms) => forms.some((form) => form.name === name),
);

export const formsSelectors = {
  getAllForms,
  getFormById,
  isFormExistByName,
};
