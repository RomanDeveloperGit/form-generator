import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';

import { getErrorMessage } from '@/utils/errors';

import { deleteAllFields } from './action';

export const startDeleteAllFieldsListeners = (
  appListener: AppListenerMiddleware,
) => {
  appListener.startListening({
    actionCreator: deleteAllFields.fulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Field,
        MetricAction.MassDelete,
        MetricType.Success,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Success,
        `Все поля формы "${action.payload.name}" успешно удалены.`,
      );
    },
  });

  appListener.startListening({
    actionCreator: deleteAllFields.rejected,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Field,
        MetricAction.MassDelete,
        MetricType.Fail,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Error,
        'Не удалось удалить поля формы.',
        getErrorMessage(action.payload),
      );
    },
  });
};
