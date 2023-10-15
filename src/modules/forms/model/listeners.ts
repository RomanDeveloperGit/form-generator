import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';
import { NotificationType } from '@/constants/notifications';
import { getErrorMessage } from '@/utils/errors';

import { formsThunkActions } from './actions';

const startCreateFormListeners = (appListener: AppListenerMiddleware) => {
  appListener.startListening({
    actionCreator: formsThunkActions.createForm.fulfilled,
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
    actionCreator: formsThunkActions.createForm.rejected,
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

const startRenameFormListeners = (appListener: AppListenerMiddleware) => {
  appListener.startListening({
    actionCreator: formsThunkActions.renameForm.fulfilled,
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
    actionCreator: formsThunkActions.renameForm.rejected,
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

const startDeleteFormListeners = (appListener: AppListenerMiddleware) => {
  appListener.startListening({
    actionCreator: formsThunkActions.deleteForm.fulfilled,
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
    actionCreator: formsThunkActions.deleteForm.rejected,
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

export const startFormsListeners = (appListener: AppListenerMiddleware) => {
  startCreateFormListeners(appListener);
  startRenameFormListeners(appListener);
  startDeleteFormListeners(appListener);
};
