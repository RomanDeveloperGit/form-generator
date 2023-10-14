import localforage from 'localforage';

export const PERSIST_CONFIG = {
  key: 'formsState',
  storage: localforage,
  whiteList: ['forms'],
};
