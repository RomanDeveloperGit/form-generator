import { createAppAsyncThunk } from '@/helpers/store';

import { createClientErrorObject } from '@/utils/errors';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { Field, FieldId, Form, FormId } from '../../types';

type Dto = {
  formId: FormId;
  fieldId: FieldId;
};

type Response = {
  form: Form;
  field: Field;
};

export const deleteField = createAppAsyncThunk<Response, Dto>(
  'forms/deleteField',
  async (dto, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const form = formsSelectors.getFormById(state, dto.formId);
      const field = formsSelectors.getFormFieldById(
        state,
        dto.formId,
        dto.fieldId,
      );

      if (!form)
        throw createClientErrorObject(
          'Неизвестная ошибка. Формы не существует.',
        );

      if (!field)
        throw createClientErrorObject(
          'Неизвестная ошибка. Поля не существует.',
        );

      thunkApi.dispatch(
        formsActions.deleteField({ formId: dto.formId, fieldId: dto.fieldId }),
      );

      return thunkApi.fulfillWithValue({
        form,
        field,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
