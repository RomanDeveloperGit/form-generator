import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';

import { getErrorMessage } from '@/libs/errors';
import { NotificationType } from '@/libs/notifications';

import { deleteField } from './action';

export const startDeleteFieldListeners = (
  appListener: AppListenerMiddleware,
) => {
  appListener.startListening({
    actionCreator: deleteField.fulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Field,
        MetricAction.Delete,
        MetricType.Success,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Success,
        `Поле "${action.payload.field.name}" из формы "${action.payload.form.name}" успешно удалено.`,
      );
    },
  });

  appListener.startListening({
    actionCreator: deleteField.rejected,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Field,
        MetricAction.Delete,
        MetricType.Fail,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Error,
        'Не удалось удалить поле.',
        getErrorMessage(action.payload),
      );
    },
  });
};
