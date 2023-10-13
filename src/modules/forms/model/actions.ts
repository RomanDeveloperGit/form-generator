import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';
import { CLIENT_ERROR } from '@/constants/errors';
import { isErrorType } from '@/helpers/errors';

import { formsActions } from './slice';
import { formsSelectors } from './selectors';

const createForm = createAsyncThunk<void, string, AppThunkApiConfig>(
  'forms / create',
  async (formName, { dispatch, getState, extra }) => {
    try {
      formName = formName.trim();

      const state = getState() as AppState;

      if (!formName)
        throw {
          code: CLIENT_ERROR,
          message: 'Имя должно быть не пустой строкой.',
        };

      if (formsSelectors.isFormExistByName(state, formName))
        throw {
          code: CLIENT_ERROR,
          message: 'Указанное имя формы уже занято.',
        };

      dispatch(
        formsActions.createForm({
          id: uuidv4(),
          name: formName,
        }),
      );

      extra.metricsApi(
        MetricContext.Form,
        MetricAction.Add,
        MetricType.Success,
      );

      extra.notificationsApi(
        NotificationType.Success,
        `Форма "${formName}" успешно создана.`,
      );
    } catch (error) {
      extra.metricsApi(MetricContext.Form, MetricAction.Add, MetricType.Fail);

      const errorDescription = isErrorType(error)
        ? error.message
        : 'Непредвиденная ошибка';

      extra.notificationsApi(
        NotificationType.Error,
        'Не удалось создать форму.',
        errorDescription,
      );

      console.error(error);

      // reject with value ?
    }
  },
);

export const formsThunkActions = {
  createForm,
};
