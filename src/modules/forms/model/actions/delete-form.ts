import { createAppAsyncThunk } from '@/helpers/store';

import { createClientErrorObject } from '@/utils/errors';

import { formsSelectors } from '../selectors';
import { formsActions } from '../slice';
import { Form } from '../types';

export const deleteForm = createAppAsyncThunk<Form, string>(
  'forms/delete',
  async (formId, thunkApi) => {
    try {
      const state = thunkApi.getState() as AppState;
      const form = formsSelectors.getFormById(state, formId);

      if (!form) throw createClientErrorObject('Формы не существует.');

      thunkApi.dispatch(formsActions.deleteForm(formId));

      return thunkApi.fulfillWithValue(form);
    } catch (error) {
      console.error(error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
