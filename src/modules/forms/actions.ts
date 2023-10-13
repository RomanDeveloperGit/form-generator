import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { MetricAction, MetricContext, MetricType } from '@/modules/metrics';
import { formsActions } from './slice';
import { formsSelectors } from './selectors';

const createForm = createAsyncThunk<void, string, AppThunkApiConfig>(
  'forms / create',
  async (formName, { dispatch, getState, extra }) => {
    try {
      const state = getState() as AppState;

      if (!formName) throw new Error('Expected name as not-empty string.');
      if (formsSelectors.isFormExistByName(state, formName))
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

export const formsThunkActions = {
  createForm,
};
