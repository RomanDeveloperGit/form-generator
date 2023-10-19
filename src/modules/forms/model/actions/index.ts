import { createField } from './create-field/action';
import { createForm } from './create-form/action';
import { deleteAllFields } from './delete-all-fields/action';
import { deleteField } from './delete-field/action';
import { deleteForm } from './delete-form/action';
import { editField } from './edit-field/action';
import { renameForm } from './rename-form/action';

export const formsThunkActions = {
  createForm,
  renameForm,
  deleteForm,
  createField,
  editField,
  deleteField,
  deleteAllFields,
};
