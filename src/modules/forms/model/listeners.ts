import { startCreateFieldListeners } from './actions/create-field/listeners';
import { startCreateFormListeners } from './actions/create-form/listeners';
import { startDeleteAllFieldsListeners } from './actions/delete-all-fields/listeners';
import { startDeleteFieldListeners } from './actions/delete-field/listeners';
import { startDeleteFormListeners } from './actions/delete-form/listeners';
import { startRenameFormListeners } from './actions/rename-form/listeners';

export const startFormsListeners = (appListener: AppListenerMiddleware) => {
  startCreateFormListeners(appListener);
  startRenameFormListeners(appListener);
  startDeleteFormListeners(appListener);
  startCreateFieldListeners(appListener);
  startDeleteFieldListeners(appListener);
  startDeleteAllFieldsListeners(appListener);
};
