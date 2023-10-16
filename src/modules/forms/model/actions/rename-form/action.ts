import { createAppAsyncThunk } from '@/helpers/store';

import { createClientErrorObject } from '@/utils/errors';

import { formsSelectors } from '../../selectors';
import { formsActions } from '../../slice';
import { Form } from '../../types';

type Input = {
  id: Form['id'];
  newName: Form['name'];
};

type Output = Input & {
  prevName: Form['name'];
};

export const renameForm = createAppAsyncThunk<Output, Input>(
  'forms/rename',
  async (formDraft, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const prevName = formsSelectors.getFormNameById(state, formDraft.id);
      const isFormExistsByName = formsSelectors.isFormExistsByName(
        state,
        formDraft.newName,
      );

      if (!prevName)
        throw createClientErrorObject(
          'Неизвестная ошибка. Предыдущее имя не найдено.',
        );

      if (isFormExistsByName)
        throw createClientErrorObject('Указанное имя формы уже занято.');

      thunkApi.dispatch(formsActions.renameForm(formDraft));

      return thunkApi.fulfillWithValue({
        ...formDraft,
        prevName,
      });
    } catch (error) {
      console.error(error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
