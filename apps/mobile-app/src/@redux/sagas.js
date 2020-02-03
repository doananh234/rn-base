import { all } from 'redux-saga/effects';
import LoginSagas from './AuthRedux/sagas';
import AppSagas from './AppRedux/sagas';
import ForgotPasswordSagas from './ForgotPasswordRedux/sagas';
import SeriesSagas from './SeriesRedux/sagas';

export default function* root() {
  yield all([
    ...SeriesSagas,
    ...AppSagas,
    ...ForgotPasswordSagas,
    ...LoginSagas,
  ]);
}
