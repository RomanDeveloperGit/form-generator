import { startCreateFormListeners } from './actions/create-form/listeners';
import { startDeleteFormListeners } from './actions/delete-form/listeners';
import { startRenameFormListeners } from './actions/rename-form/listeners';

export const startFormsListeners = (appListener: AppListenerMiddleware) => {
  startCreateFormListeners(appListener);
  startRenameFormListeners(appListener);
  startDeleteFormListeners(appListener);
};
