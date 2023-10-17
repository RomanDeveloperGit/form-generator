import { createSelector } from '@reduxjs/toolkit';

import { FormId } from './types';

const getAllForms = (state: AppState) => state.forms;

const getFormById = createSelector(
  (_: AppState, id: FormId) => id,
  getAllForms,
  (id, forms) => forms.find((form) => form.id === id),
);

const getFormNameById = createSelector(getFormById, (form) => form?.name);
const getFormFieldsById = createSelector(getFormById, (form) => form?.fields);
const getFormFieldsCountById = createSelector(
  getFormFieldsById,
  (fields) => fields?.length,
);

const isFormExistsById = createSelector(
  (_: AppState, id: FormId) => id,
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
  getFormFieldsById,
  getFormFieldsCountById,
  isFormExistsById,
  isFormExistsByName,
};
