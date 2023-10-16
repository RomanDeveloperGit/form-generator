import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';

import { getErrorMessage } from '@/utils/errors';

import { renameForm } from './action';

export const startRenameFormListeners = (appListener: AppListenerMiddleware) => {
  appListener.startListening({
    actionCreator: renameForm.fulfilled,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Form,
        MetricAction.Edit,
        MetricType.Success,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Success,
        `Форма "${action.payload.prevName}" была переименована на "${action.payload.newName}".`,
      );
    },
  });

  appListener.startListening({
    actionCreator: renameForm.rejected,
    effect: async (action, listenerApi) => {
      listenerApi.extra.metricsApi(
        MetricContext.Form,
        MetricAction.Edit,
        MetricType.Fail,
      );

      listenerApi.extra.notificationsApi(
        NotificationType.Error,
        'Не удалось переименовать форму.',
        getErrorMessage(action.payload),
      );
    },
  });
};
