import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from 'redux-persist-seamless-immutable';
import realmInstance from './RealmPersistInstance';

const transformerConfig = {
  whitelistPerReducer: {
    login: ['data', 'token', 'isFirstTime', 'isSkipLogin'],
  },
};

export const REDUX_PERSIST = {
  key: 'root',
  storage: realmInstance,
  version: 1,
  whitelist: ['login'],
  blacklist: [],
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)],
};
