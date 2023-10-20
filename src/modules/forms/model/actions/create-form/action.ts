import { v4 as uuidv4 } from 'uuid';

import { createExpectedError } from '@/libs/errors';
import { createAppAsyncThunk } from '@/libs/store';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { Form } from '../../types';

export const createForm = createAppAsyncThunk<Form, string>(
  'forms/createForm',
  async (formName, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const isFormExistsByName = formsSelectors.isFormExistsByName(
        state,
        formName,
      );

      if (isFormExistsByName)
        throw createExpectedError('Указанное название формы уже занято.');

      const form: Form = {
        id: uuidv4(),
        name: formName,
        fields: [],
      };

      thunkApi.dispatch(formsActions.createForm(form));

      return thunkApi.fulfillWithValue(form);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
