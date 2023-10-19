import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';

import { getErrorMessage } from '@/utils/errors';

import { editField } from './action';

export const startEditFieldListeners = (appListener: AppListenerMiddleware) => {
  appListener.startListening({
    actionCreator: editField.fulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Field,
        MetricAction.Edit,
        MetricType.Success,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Success,
        `Поле "${action.payload.prevData.name}" было отредактировано.`,
      );
    },
  });

  appListener.startListening({
    actionCreator: editField.rejected,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Field,
        MetricAction.Edit,
        MetricType.Fail,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Error,
        'Не удалось отредактировать поле.',
        getErrorMessage(action.payload),
      );
    },
  });
};
