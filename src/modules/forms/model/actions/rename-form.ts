import { createAsyncThunk } from '@reduxjs/toolkit';

import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';
import { CLIENT_ERROR } from '@/constants/errors';
import { isErrorType } from '@/helpers/errors';

import { formsListActions } from '../list/slice';
import { formsSelectors } from '../list/selectors';
import { Form } from '../types';

export const renameForm = createAsyncThunk<
  Form,
  Pick<Form, 'id' | 'name'>,
  AppThunkApiConfig
>(
  'forms/rename',
  async (
    form,
    { dispatch, fulfillWithValue, rejectWithValue, getState, extra },
  ) => {
    try {
      const state = getState() as AppState;
      const prevFormName = formsSelectors.getFormNameById(state, form.id);
      const isFormExistsByName = formsSelectors.isFormExistsByName(
        state,
        form.name,
      );

      if (isFormExistsByName)
        throw {
          code: CLIENT_ERROR,
          message: 'Указанное имя формы уже занято.',
        };

      dispatch(formsListActions.renameForm(form));

      extra.metricsApi(
        MetricContext.Form,
        MetricAction.Edit,
        MetricType.Success,
      );

      extra.notificationsApi(
        NotificationType.Success,
        `Форма "${prevFormName}" была переименована на "${form.name}".`,
      );

      return fulfillWithValue(form);
    } catch (error) {
      extra.metricsApi(MetricContext.Form, MetricAction.Edit, MetricType.Fail);

      const errorDescription = isErrorType(error)
        ? error.message
        : 'Непредвиденная ошибка';

      extra.notificationsApi(
        NotificationType.Error,
        'Не удалось переименовать форму.',
        errorDescription,
      );

      console.error(error);

      return rejectWithValue(error);
    }
  },
);
