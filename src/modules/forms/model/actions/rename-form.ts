import { createAppAsyncThunk } from '@/helpers/store';
import { createClientErrorObject } from '@/utils/errors';

import { formsListActions } from '../list/slice';
import { formsSelectors } from '../list/selectors';
import { Form } from '../types';

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
      const state = thunkApi.getState() as AppState;
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

      thunkApi.dispatch(
        formsListActions.renameForm({
          id: formDraft.id,
          name: formDraft.newName,
        }),
      );

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
