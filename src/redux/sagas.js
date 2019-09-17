import { all } from 'redux-saga/effects';
import LoginSagas from './LoginRedux/sagas';
import AppSagas from './AppRedux/sagas';
import ForgotPasswordSagas from './ForgotPasswordRedux/sagas';

export default function* root() {
  yield all([...AppSagas, ...ForgotPasswordSagas, ...LoginSagas]);
}
