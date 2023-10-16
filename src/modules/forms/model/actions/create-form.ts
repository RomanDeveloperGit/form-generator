import { v4 as uuidv4 } from 'uuid';

import { createAppAsyncThunk } from '@/helpers/store';

import { createClientErrorObject } from '@/utils/errors';

import { formsSelectors } from '../selectors';
import { formsActions } from '../slice';
import { Form } from '../types';

export const createForm = createAppAsyncThunk<Form, string>(
  'forms/create',
  async (formName, thunkApi) => {
    try {
      const state = thunkApi.getState();
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

      thunkApi.dispatch(formsActions.createForm(form));

      return thunkApi.fulfillWithValue(form);
    } catch (error) {
      console.error(error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
