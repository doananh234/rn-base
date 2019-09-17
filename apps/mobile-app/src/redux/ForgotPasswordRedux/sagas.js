import {
 call, put, takeLatest,
} from 'redux-saga/effects';
// import I18n from 'i18n-js';
import {
 forgotPassword, verifyPasswordToken, newPassword,
} from '../../api/auth';
import Actions, {
 Types,
} from './actions';
// import { showModal, startStackScreen, showInAppNoti } from '../../navigation/navigationActions';
// import { close, closeAll } from '../../navigation/navigationButtons';
import {
 apiWrapper,
} from '../../utils/reduxUtils';

export function* forgotPasswordWorker({ data }) {
  try {
    const response = yield call(apiWrapper, { isShowProgress: true }, forgotPassword, data);
    if (!response || !response.success) {
      yield put(Actions.forgotPasswordFailure(response));
      // showInAppNoti({
      //   title: null,
      //   content: response?.message || I18n.t('error.somethingWentWrong'),
      //   type: 'error',
      // });
      return;
    }
    yield put(Actions.forgotPasswordSuccess());
    // TODO: Show verify code screen
    // showModal('VerifyPassword', {
    //   leftButtons: [close()],
    // });
  } catch (err) {
    // showInAppNoti({
    //   title: null,
    //   content: err?.message || I18n.t('error.somethingWentWrong'),
    //   type: 'error',
    // });
    yield put(Actions.forgotPasswordFailure(err));
  }
}

export function* verifyPasswordWorker({ data }) {
  try {
    const response = yield call(apiWrapper, { isShowProgress: true }, verifyPasswordToken, data);
    if (!response || !response.success) {
      yield put(Actions.verifyPasswordFailure(response));
      // showInAppNoti({
      //   title: null,
      //   content: response?.message || I18n.t('error.somethingWentWrong'),
      //   type: 'error',
      // });
      return;
    }
    yield put(Actions.verifyPasswordSuccess(response));
    // TODO: Show reset password
    showModal('ResetPassword', {
      leftButtons: [closeAll()],
    });
  } catch (err) {
    // showInAppNoti({
    //   title: null,
    //   content: err?.message || I18n.t('error.somethingWentWrong'),
    //   type: 'error',
    // });

    yield put(Actions.verifyPasswordFailure(err));
  }
}

export function* resetPasswordWorker({ data }) {
  try {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      // showInAppNoti({
      //   title: null,
      //   content: I18n.t('error.passwordMismatch'),
      //   type: 'error',
      // });
      return;
    }
    const response = yield call(apiWrapper, { isShowProgress: true }, newPassword, data);
    if (!response || !response.success) {
      // showInAppNoti({
      //   title: null,
      //   content: response?.message || I18n.t('error.somethingWentWrong'),
      //   type: 'error',
      // });
      yield put(Actions.resetPasswordFailure(response));
      return;
    }
    yield put(Actions.resetPasswordSuccess(response));

    // TODO: Show intro screen
    // startStackScreen();
  } catch (err) {
    // showInAppNoti({
    //   title: null,
    //   content: err?.message || I18n.t('error.resetPassword'),
    //   type: 'error',
    // });
    yield put(Actions.resetPasswordFailure(err));
  }
}

const passwordSagas = () => {
  return [
    takeLatest(Types.FORGOT_PASSWORD, forgotPasswordWorker),
    takeLatest(Types.VERIFY_PASSWORD, verifyPasswordWorker),
    takeLatest(Types.RESET_PASSWORD, resetPasswordWorker),
  ];
};

export default passwordSagas();
