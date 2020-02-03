import { call, put, takeLatest } from 'redux-saga/effects';
// import I18n from 'i18n-js';
import {
  forgotPassword,
  verifyPasswordToken,
  newPassword,
} from '../../api/auth';
import { actions } from './slice';
// import { showModal, startStackScreen, showInAppNoti } from '../../navigation/navigationActions';
// import { close, closeAll } from '../../navigation/navigationButtons';
import { apiWrapper } from 'utils/reduxUtils';

export function* forgotPasswordSaga({ data }) {
  try {
    const response = yield call(
      apiWrapper,
      { isShowProgress: true },
      forgotPassword,
      data,
    );
    if (!response || !response.success) {
      yield put(actions.forgotPasswordFailure(response));
      // showInAppNoti({
      //   title: null,
      //   content: response?.message || I18n.translate('error.somethingWentWrong'),
      //   type: 'error',
      // });
      return;
    }
    yield put(actions.forgotPasswordSuccess());
    // TODO: Show verify code screen
    // showModal('VerifyPassword', {
    //   leftButtons: [close()],
    // });
  } catch (err) {
    // showInAppNoti({
    //   title: null,
    //   content: err?.message || I18n.translate('error.somethingWentWrong'),
    //   type: 'error',
    // });
    yield put(actions.forgotPasswordFailure(err));
  }
}

export function* verifyPasswordSaga({ data }) {
  try {
    const response = yield call(
      apiWrapper,
      { isShowProgress: true },
      verifyPasswordToken,
      data,
    );
    if (!response || !response.success) {
      yield put(actions.verifyPasswordFailure(response));
      // showInAppNoti({
      //   title: null,
      //   content: response?.message || I18n.translate('error.somethingWentWrong'),
      //   type: 'error',
      // });
      return;
    }
    yield put(actions.verifyPasswordSuccess(response));
    // TODO: Show reset password
    // showModal('ResetPassword', {
    //   leftButtons: [closeAll()],
    // });
  } catch (err) {
    // showInAppNoti({
    //   title: null,
    //   content: err?.message || I18n.translate('error.somethingWentWrong'),
    //   type: 'error',
    // });

    yield put(actions.verifyPasswordFailure(err));
  }
}

export function* resetPasswordSaga({ data }) {
  try {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      // showInAppNoti({
      //   title: null,
      //   content: I18n.translate('error.passwordMismatch'),
      //   type: 'error',
      // });
      return;
    }
    const response = yield call(
      apiWrapper,
      { isShowProgress: true },
      newPassword,
      data,
    );
    if (!response || !response.success) {
      // showInAppNoti({
      //   title: null,
      //   content: response?.message || I18n.translate('error.somethingWentWrong'),
      //   type: 'error',
      // });
      yield put(actions.resetPasswordFailure(response));
      return;
    }
    yield put(actions.resetPasswordSuccess(response));

    // TODO: Show intro screen
    // startStackScreen();
  } catch (err) {
    // showInAppNoti({
    //   title: null,
    //   content: err?.message || I18n.translate('error.resetPassword'),
    //   type: 'error',
    // });
    yield put(actions.resetPasswordFailure(err));
  }
}

const passwordSagas = () => {
  return [
    takeLatest(actions.forgotPassword().type, forgotPasswordSaga),
    takeLatest(actions.verifyPassword().type, verifyPasswordSaga),
    takeLatest(actions.resetPassword().type, resetPasswordSaga),
  ];
};

export default passwordSagas();
