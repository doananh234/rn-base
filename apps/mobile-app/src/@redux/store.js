import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  persistStore,
  REHYDRATE,
  PURGE,
  persistCombineReducers,
  FLUSH,
  PAUSE,
  PERSIST,
  REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';
import Config from '../config/DebugSettings';
import rootSaga from './sagas';
import deferredMiddleware from './ExposedPromiseMiddleware';
import { REDUX_PERSIST } from '../realmConfig/persistRealm';

export default onComplete => {
  const SAGA_LOGGING_BLACKLIST = [
    'EFFECT_TRIGGERED',
    'EFFECT_RESOLVED',
    'EFFECT_REJECTED',
  ];

  const persistedReducer = persistCombineReducers(REDUX_PERSIST, rootReducer);
  const middleware = [];

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(deferredMiddleware);
  middleware.push(sagaMiddleware);
  if (__DEV__) {
    const USE_LOGGING = Config.reduxLogging;
    const logger = createLogger({
      predicate: (getState, { type }) =>
        USE_LOGGING && !_.includes(SAGA_LOGGING_BLACKLIST, type),
    });
    middleware.push(logger);
  }

  const store = configureStore({
    reducer: persistedReducer,
    middleware: [
      ...middleware,
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    ],
  });
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(persistedReducer),
    );
  }

  const persistor = persistStore(store, null, () => {});
  sagaMiddleware.run(rootSaga);
  onComplete(store, persistor);
  return { store, persistor };
};
