import { createAsyncThunk } from '@reduxjs/toolkit';

import { createClientErrorObject } from '@/utils/errors';

import { formsListActions } from '../list/slice';
import { formsSelectors } from '../list/selectors';
import { Form } from '../types';

export const deleteForm = createAsyncThunk<Form, string, AppThunkApiConfig>(
  'forms/delete',
  async (formId, thunkApi) => {
    try {
      const state = thunkApi.getState() as AppState;
      const form = formsSelectors.getFormById(state, formId);

      if (!form) throw createClientErrorObject('Формы не существует.');

      thunkApi.dispatch(formsListActions.deleteForm(formId));

      return thunkApi.fulfillWithValue(form);
    } catch (error) {
      console.error(error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
