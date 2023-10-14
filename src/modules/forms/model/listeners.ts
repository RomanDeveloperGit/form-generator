import { formsThunkActions } from './actions';

// Перевести createAsyncThunk на хелпер

export const startFormsListeners = (appListener: AppListenerMiddleware) => {
  appListener.startListening({
    actionCreator: formsThunkActions.createForm.fulfilled,
    effect: (action, listenerApi) => {
      console.log('in listener', { action, listenerApi });
    },
  });
};
