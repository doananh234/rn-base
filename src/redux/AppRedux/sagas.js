// import { takeLatest, select } from 'redux-saga/effects';
// // import { startWithTabs, startStackScreen } from '../../navigation/navigationActions';
// import { Types } from './actions';

// export function* startup() {
//   const { token, isSkipLogin } = yield select(state => state.login);
//   global.token = token;
//   token || isSkipLogin ? startWithTabs() : startStackScreen();
//   // startWithTabs();
//   // startStackScreen();
// }

// const appSagas = () => {
//   return [takeLatest(Types.STARTUP, startup), takeLatest('persist/REHYDRATE', startup)];
// };

// export default appSagas();
