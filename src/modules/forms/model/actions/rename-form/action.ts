import { createAppAsyncThunk } from '@/helpers/store';

import { createClientErrorObject } from '@/utils/errors';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { FormId } from '../../types';

type Input = {
  id: FormId;
  newName: string;
};

type Output = Input & {
  prevName: string;
};

export const renameForm = createAppAsyncThunk<Output, Input>(
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
        throw createClientErrorObject(
          'Неизвестная ошибка. Предыдущее название не найдено.',
        );

      if (prevName === dto.newName)
        throw createClientErrorObject(
          'Указанное название формы идентично существующему.',
        );

      if (isFormExistsByName)
        throw createClientErrorObject('Указанное название формы уже занято.');

      thunkApi.dispatch(formsActions.renameForm(dto));

      return thunkApi.fulfillWithValue({
        ...dto,
        prevName,
      });
    } catch (error) {
      console.error(error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
