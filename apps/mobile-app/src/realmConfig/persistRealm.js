import createFilter from 'redux-persist-transform-filter';
import AsyncStorage from '@react-native-community/async-storage';

const whitelist = {
  auth: ['data', 'token', 'isSkipLogin', 'isFirstTime', 'isLogged'],
  app: ['language'],
};

const makeTransforms = () =>
  Object.keys(whitelist).map(key => createFilter(key, whitelist[key]));

export const REDUX_PERSIST = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: Object.keys(whitelist),
  blacklist: [],
  transforms: makeTransforms(),
};
