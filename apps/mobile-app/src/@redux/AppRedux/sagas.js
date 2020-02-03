import { takeLatest, select } from 'redux-saga/effects';
import { startStackScreen, startWithTabs } from 'navigation/navigationActions';
import { startup } from '@redux/AppRedux/slice';

function* startupSaga() {
  try {
    const { token, isSkipLogin } = yield select(state => state.auth);
    token || isSkipLogin ? startWithTabs() : startStackScreen();
    // startWithTabs();
    // startStackScreen();
  } catch (error) {
    //
  }
}

export default [takeLatest(startup().type, startupSaga)];
