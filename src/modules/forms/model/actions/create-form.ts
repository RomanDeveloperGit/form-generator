import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';
import { CLIENT_ERROR } from '@/constants/errors';
import { isErrorType } from '@/helpers/errors';

import { formsListActions } from '../list/slice';
import { formsSelectors } from '../list/selectors';
import { Form } from '../types';

export const createForm = createAsyncThunk<Form, string, AppThunkApiConfig>(
  'forms/create',
  async (
    formName,
    { dispatch, fulfillWithValue, rejectWithValue, getState, extra },
  ) => {
    try {
      const state = getState() as AppState;
      const isFormExistsByName = formsSelectors.isFormExistsByName(state, formName);

      if (isFormExistsByName)
        throw {
          code: CLIENT_ERROR,
          message: 'Указанное имя формы уже занято.',
        };

      const form: Form = {
        id: uuidv4(),
        name: formName,
        fields: [],
      };

      dispatch(formsListActions.createForm(form));

      extra.metricsApi(
        MetricContext.Form,
        MetricAction.Create,
        MetricType.Success,
      );

      extra.notificationsApi(
        NotificationType.Success,
        `Форма "${form.name}" успешно создана.`,
      );

      return fulfillWithValue(form);
    } catch (error) {
      extra.metricsApi(MetricContext.Form, MetricAction.Create, MetricType.Fail);

      const errorDescription = isErrorType(error)
        ? error.message
        : 'Непредвиденная ошибка';

      extra.notificationsApi(
        NotificationType.Error,
        'Не удалось создать форму.',
        errorDescription,
      );

      console.error(error);

      return rejectWithValue(error);
    }
  },
);
