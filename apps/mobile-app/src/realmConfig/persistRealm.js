import createFilter from 'redux-persist-transform-filter';
import realmInstance from './RealmPersistInstance';

const whitelist = {
  auth: ['data', 'token', 'isSkipLogin', 'isFirstTime', 'isLogged'],
  app: ['language'],
};

const makeTransforms = () =>
  Object.keys(whitelist).map(key => createFilter(key, whitelist[key]));

export const REDUX_PERSIST = {
  key: 'root',
  storage: realmInstance,
  version: 1,
  whitelist: Object.keys(whitelist),
  blacklist: [],
  transforms: makeTransforms(),
};
