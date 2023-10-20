import { createExpectedError } from '@/libs/errors';
import { createAppAsyncThunk } from '@/libs/store';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { FormId } from '../../types';

type Dto = {
  id: FormId;
  newName: string;
};

type Response = Dto & {
  prevName: string;
};

export const renameForm = createAppAsyncThunk<Response, Dto>(
  'forms/renameForm',
  async (dto, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const prevName = formsSelectors.getFormNameById(state, dto.id);
      const isFormExistsByName = formsSelectors.isFormExistsByName(
        state,
        dto.newName,
      );

      if (!prevName)
        throw createExpectedError(
          'Неизвестная ошибка. Предыдущее название не найдено.',
        );

      if (prevName === dto.newName)
        throw createExpectedError(
          'Указанное название формы идентично существующему.',
        );

      if (isFormExistsByName)
        throw createExpectedError('Указанное название формы уже занято.');

      thunkApi.dispatch(formsActions.renameForm(dto));

      return thunkApi.fulfillWithValue({
        ...dto,
        prevName,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
