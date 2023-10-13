import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { MetricAction, MetricContext, MetricType } from '@/modules/metrics';
import { formsActions } from './slice';
import { isFormExistByName } from './selectors';

export const createForm = createAsyncThunk<void, undefined, AppThunkApiConfig>(
  'forms / create',
  async (_, { dispatch, getState, extra }) => {
    try {
      const state = getState() as AppState;

      const formName = prompt('Введите имя формы');

      if (!formName) throw new Error('Expected name as not-empty string.');
      if (isFormExistByName(state, formName))
        throw new Error('The name of the form is occupied.');

      dispatch(
        formsActions.createForm({
          id: uuidv4(),
          name: formName,
        }),
      );

      extra.sendMetric(
        MetricContext.Form,
        MetricAction.Add,
        MetricType.Success,
      );

      // ПУШИТЬ УВЕДОМЛЕНИЯ; ВОЗМОЖНО, ЛИСТЕНЕР НУЖЕН?
    } catch (error) {
      extra.sendMetric(MetricContext.Form, MetricAction.Add, MetricType.Fail);
      // ПУШИТЬ УВЕДОМЛЕНИЯ; ВОЗМОЖНО, ЛИСТЕНЕР НУЖЕН?

      console.error(error);
    }
  },
);
