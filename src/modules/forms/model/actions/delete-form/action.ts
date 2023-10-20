import { createExpectedError } from '@/libs/errors';
import { createAppAsyncThunk } from '@/libs/store';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { Form, FormId } from '../../types';

export const deleteForm = createAppAsyncThunk<Form, FormId>(
  'forms/deleteForm',
  async (formId, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const form = formsSelectors.getFormById(state, formId);

      if (!form)
        throw createExpectedError('Неизвестная ошибка. Формы не существует.');

      thunkApi.dispatch(formsActions.deleteForm(formId));

      return thunkApi.fulfillWithValue(form);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
