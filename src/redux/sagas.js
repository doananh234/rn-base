import { all } from 'redux-saga/effects';
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import ForgotPasswordSagas from './ForgotPasswordRedux/sagas';

export default function* root() {
  yield all([...ForgotPasswordSagas, ...loginSagas]);
}
