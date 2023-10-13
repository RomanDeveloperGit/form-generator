import storage from 'redux-persist/lib/storage';

export const PERSIST_CONFIG = {
  key: 'formsState',
  storage,
  whiteList: ['forms'],
};
