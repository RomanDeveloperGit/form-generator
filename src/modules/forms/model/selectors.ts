import { createSelector } from '@reduxjs/toolkit';

import { FieldId, FormId } from './types';

const getAllForms = (state: AppState) => state.forms;

const getFormById = createSelector(
  (_state: AppState, id: FormId) => id,
  getAllForms,
  (id, forms) => forms.find((form) => form.id === id),
);

const getFormNameById = createSelector(getFormById, (form) => form?.name);
const getFormFieldsById = createSelector(getFormById, (form) => form?.fields);
const getFormFieldsCountById = createSelector(
  getFormFieldsById,
  (fields) => fields?.length,
);
const getFormFieldById = createSelector(
  (_state: AppState, _formId: FormId, fieldId: FieldId) => fieldId,
  getFormFieldsById,
  (fieldId, fields) => fields?.find((field) => field.id === fieldId),
);

const isFormExistsById = createSelector(
  (_state: AppState, id: FormId) => id,
  getAllForms,
  (id, forms) => forms.some((form) => form.id === id),
);

const isFormExistsByName = createSelector(
  (_state: AppState, name: string) => name,
  getAllForms,
  (name, forms) => forms.some((form) => form.name === name),
);

export const formsSelectors = {
  getAllForms,
  getFormById,
  getFormNameById,
  getFormFieldsById,
  getFormFieldsCountById,
  getFormFieldById,
  isFormExistsById,
  isFormExistsByName,
};
