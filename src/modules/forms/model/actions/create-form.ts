import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { createClientErrorObject } from '@/utils/errors';

import { formsListActions } from '../list/slice';
import { formsSelectors } from '../list/selectors';
import { Form } from '../types';

export const createForm = createAsyncThunk<Form, string, AppThunkApiConfig>(
  'forms/create',
  async (formName, thunkApi) => {
    try {
      const state = thunkApi.getState() as AppState;
      const isFormExistsByName = formsSelectors.isFormExistsByName(
        state,
        formName,
      );

      if (isFormExistsByName)
        throw createClientErrorObject('Указанное имя формы уже занято.');

      const form: Form = {
        id: uuidv4(),
        name: formName,
        fields: [],
      };

      thunkApi.dispatch(formsListActions.createForm(form));

      return thunkApi.fulfillWithValue(form);
    } catch (error) {
      console.error(error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
