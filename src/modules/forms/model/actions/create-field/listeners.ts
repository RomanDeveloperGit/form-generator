import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';

import { getErrorMessage } from '@/libs/errors';
import { NotificationType } from '@/libs/notifications';

import { createField } from './action';

export const startCreateFieldListeners = (
  appListener: AppListenerMiddleware,
) => {
  appListener.startListening({
    actionCreator: createField.fulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Field,
        MetricAction.Create,
        MetricType.Success,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Success,
        `Поле "${action.payload.field.name}" для формы "${action.payload.form.name}" успешно создано.`,
      );
    },
  });

  appListener.startListening({
    actionCreator: createField.rejected,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Field,
        MetricAction.Create,
        MetricType.Fail,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Error,
        'Не удалось создать поле формы.',
        getErrorMessage(action.payload),
      );
    },
  });
};
