import { createField } from './create-field/action';
import { createForm } from './create-form/action';
import { deleteAllFields } from './delete-all-fields/action';
import { deleteForm } from './delete-form/action';
import { renameForm } from './rename-form/action';

export const formsThunkActions = {
  createForm,
  renameForm,
  deleteForm,
  createField,
  deleteAllFields,
};
