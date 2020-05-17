import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { compose } from 'redux';
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
import _ from 'lodash';
import { createLogger } from 'redux-logger';
import Config from '../config/DebugSettings';
import rootReducer from './reducers';
import { REDUX_PERSIST } from '../realmConfig/persistRealm';
// eslint-disable-next-line
const composedEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default onComplete => {
  const persistedReducer = persistCombineReducers(REDUX_PERSIST, rootReducer);
  const middleware = [];

  if (__DEV__) {
    const USE_LOGGING = Config.reduxLogging;
    const logger = createLogger({
      predicate: (getState, { type }) => USE_LOGGING && !_.includes([], type),
    });
    middleware.push(logger);
  }

  const store = configureStore({
    reducer: persistedReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      ...middleware,
    ],
  });
  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers', () =>
  //     store.replaceReducer(persistedReducer),
  //   );
  // }

  const persistor = persistStore(store, null, () => {});
  onComplete(store, persistor);
  return { store, persistor };
};
