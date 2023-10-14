import { createAsyncThunk } from '@reduxjs/toolkit';

import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';
import { CLIENT_ERROR } from '@/constants/errors';
import { isErrorType } from '@/helpers/errors';

import { formsListActions } from '../list/slice';
import { formsSelectors } from '../list/selectors';
import { Form } from '../types';

export const deleteForm = createAsyncThunk<Form, string, AppThunkApiConfig>(
  'forms/delete',
  async (
    formId,
    { dispatch, fulfillWithValue, rejectWithValue, getState, extra },
  ) => {
    try {
      const state = getState() as AppState;
      const form = formsSelectors.getFormById(state, formId);

      if (!form)
        throw {
          code: CLIENT_ERROR,
          message: 'Формы не существует.',
        };

      dispatch(formsListActions.deleteForm(formId));

      extra.metricsApi(
        MetricContext.Form,
        MetricAction.Delete,
        MetricType.Success,
      );

      extra.notificationsApi(
        NotificationType.Success,
        `Форма "${form.name}" успешно удалена.`,
      );

      return fulfillWithValue(form);
    } catch (error) {
      extra.metricsApi(
        MetricContext.Form,
        MetricAction.Delete,
        MetricType.Fail,
      );

      const errorDescription = isErrorType(error)
        ? error.message
        : 'Непредвиденная ошибка';

      extra.notificationsApi(
        NotificationType.Error,
        'Не удалось удалить форму.',
        errorDescription,
      );

      console.error(error);

      return rejectWithValue(error);
    }
  },
);
