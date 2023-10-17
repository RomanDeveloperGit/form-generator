import { createAppAsyncThunk } from '@/helpers/store';

import { createClientErrorObject } from '@/utils/errors';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { Field, Form, FormId } from '../../types';

export const deleteAllFields = createAppAsyncThunk<Form, FormId>(
  'forms/deleteAllFields',
  async (formId, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const form = formsSelectors.getFormById(state, formId);
      const fieldsCount = formsSelectors.getFormFieldsCountById(state, formId);

      if (!form)
        throw createClientErrorObject(
          'Неизвестная ошибка. Формы не существует.',
        );

      if (!fieldsCount)
        throw createClientErrorObject(`У формы "${form.name}" нет полей.`);

      thunkApi.dispatch(formsActions.deleteAllFields({ formId }));

      return thunkApi.fulfillWithValue({
        ...form,
        fields: formsSelectors.getFormFieldsById(state, formId) as Field[],
      });
    } catch (error) {
      console.error(error);

      return thunkApi.rejectWithValue(error);
    }
  },
);