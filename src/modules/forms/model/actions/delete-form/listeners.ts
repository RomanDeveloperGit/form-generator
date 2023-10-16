import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';

import { getErrorMessage } from '@/utils/errors';

import { deleteForm } from './action';

export const startDeleteFormListeners = (appListener: AppListenerMiddleware) => {
  appListener.startListening({
    actionCreator: deleteForm.fulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Form,
        MetricAction.Delete,
        MetricType.Success,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Success,
        `Форма "${action.payload.name}" успешно удалена.`,
      );
    },
  });

  appListener.startListening({
    actionCreator: deleteForm.rejected,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Form,
        MetricAction.Delete,
        MetricType.Fail,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Error,
        'Не удалось удалить форму.',
        getErrorMessage(action.payload),
      );
    },
  });
};
