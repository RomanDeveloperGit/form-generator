import { createExpectedError } from '@/libs/errors';
import { createAppAsyncThunk } from '@/libs/store';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { FieldId, FieldWithoutId, FormId } from '../../types';

type Dto = {
  formId: FormId;
  fieldId: FieldId;
  newData: FieldWithoutId;
};

type Response = Dto & {
  prevData: FieldWithoutId;
};

export const editField = createAppAsyncThunk<Response, Dto>(
  'forms/editField',
  async (dto, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const prevFieldData = formsSelectors.getFormFieldById(
        state,
        dto.formId,
        dto.fieldId,
      );
      const foundFieldByName = formsSelectors.getFormFieldByName(
        state,
        dto.formId,
        dto.newData.name,
      );

      if (!prevFieldData)
        throw createExpectedError(
          'Неизвестная ошибка. Предыдущие данные поля не найдены.',
        );

      if (foundFieldByName && foundFieldByName.id !== dto.fieldId)
        throw createExpectedError('Указанное название поля уже занято.');

      thunkApi.dispatch(formsActions.editField(dto));

      return thunkApi.fulfillWithValue({
        ...dto,
        prevData: prevFieldData,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
