import { v4 as uuidv4 } from 'uuid';

import { createExpectedError } from '@/libs/errors';
import { createAppAsyncThunk } from '@/libs/store';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { Field, FieldWithoutId, Form, FormId } from '../../types';

type Dto = {
  formId: FormId;
  data: FieldWithoutId;
};

type Response = {
  form: Form;
  field: Field;
};

export const createField = createAppAsyncThunk<Response, Dto>(
  'forms/createField',
  async (dto, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const form = formsSelectors.getFormById(state, dto.formId);
      const isFieldExistsByName = formsSelectors.isFieldExistsByName(
        state,
        dto.formId,
        dto.data.name,
      );

      if (!form)
        throw createExpectedError('Неизвестная ошибка. Формы не существует.');

      if (isFieldExistsByName)
        throw createExpectedError('Указанное название поля уже занято.');

      const field: Field = {
        id: uuidv4(),
        ...dto.data,
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
      return thunkApi.rejectWithValue(error);
    }
  },
);
