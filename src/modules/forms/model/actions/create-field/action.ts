import { v4 as uuidv4 } from 'uuid';

import { createAppAsyncThunk } from '@/helpers/store';

import { createClientErrorObject } from '@/utils/errors';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { Field, Form, FormId } from '../../types';

type Input = {
  formId: FormId;
  field: Omit<Field, 'id'>;
};

type Output = {
  form: Form;
  field: Field;
};

export const createField = createAppAsyncThunk<Output, Input>(
  'forms/createField',
  async (dto, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const form = formsSelectors.getFormById(state, dto.formId);

      if (!form)
        throw createClientErrorObject(
          'Неизвестная ошибка. Формы не существует.',
        );

      const field: Field = {
        id: uuidv4(),
        ...dto.field,
      };

      thunkApi.dispatch(
        formsActions.createField({
          ...dto,
          field,
        }),
      );

      return thunkApi.fulfillWithValue({
        form: formsSelectors.getFormById(state, dto.formId) as Form,
        field,
      });
    } catch (error) {
      console.error(error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
