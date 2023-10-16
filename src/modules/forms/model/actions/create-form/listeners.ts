import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';

import { getErrorMessage } from '@/utils/errors';

import { createForm } from './action';

export const startCreateFormListeners = (appListener: AppListenerMiddleware) => {
  appListener.startListening({
    actionCreator: createForm.fulfilled,
    effect: async (action, listenerApi) => {
      // condition, subscribe, unsubscribe, pause, take, signal
      listenerApi.extra.metricsApi(
        MetricContext.Form,
        MetricAction.Create,
        MetricType.Success,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Success,
        `Форма "${action.payload.name}" успешно создана.`,
      );
    },
  });

  appListener.startListening({
    actionCreator: createForm.rejected,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Form,
        MetricAction.Create,
        MetricType.Fail,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Error,
        'Не удалось создать форму.',
        getErrorMessage(action.payload),
      );
    },
  });
};
