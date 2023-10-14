import { createSelector } from '@reduxjs/toolkit';

const getAllForms = (state: AppState) => state.forms;

const getFormById = createSelector(
  (_: AppState, id: string) => id,
  getAllForms,
  (id, forms) => forms.find((form) => form.id === id),
);
const getFormNameById = createSelector(getFormById, (form) => form?.name);

const isFormExistsById = createSelector(
  (_: AppState, id: string) => id,
  getAllForms,
  (id, forms) => forms.some((form) => form.id === id),
);

const isFormExistsByName = createSelector(
  (_: AppState, name: string) => name,
  getAllForms,
  (name, forms) => forms.some((form) => form.name === name),
);

export const formsSelectors = {
  getAllForms,
  getFormById,
  getFormNameById,
  isFormExistsById,
  isFormExistsByName,
};
