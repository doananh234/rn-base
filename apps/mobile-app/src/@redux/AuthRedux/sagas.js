import { call, put, takeLatest, take, race } from 'redux-saga/effects';
import { actions } from './slice';
import {
  login,
  register,
  getInfo,
  updatePassword,
  editUser,
  loginFacebook,
} from '../../api/auth';
import { apiWrapper } from 'utils/reduxUtils';
import { startup } from '@redux/AppRedux/slice';

export function* signOut() {
  try {
    yield race([
      take('DELETE_DEVICE_TOKENS_SUCCESS'),
      take('DELETE_DEVICE_TOKENS_FAILURE'),
    ]);
    global.token = null;
  } catch (error) {}
}

export function* signUp({ data }) {
  try {
    const response = yield call(
      apiWrapper,
      { isShowProgress: true },
      register,
      data,
    );
    if (!response || !response.token) {
      yield put(actions.signUpFailure(response));
      // showInAppNoti({
      //   title: null,
      //   content: response?.message || I18n.translate('error.resetPassword'),
      //   type: 'error',
      // });
      return;
    }
    yield put(actions.signInSuccess(response.token, response.user));
    global.token = response.token;
    // yield put(actions.getUser());
    // yield put(startup());
  } catch (err) {
    yield put(actions.signUpFailure(err));
    if (err && err.error && err.error.response) {
      // showInAppNoti({
      //   title: null,
      //   content: I18n.translate('error.signup', { message: 'tài khoản' }),
      //   type: 'error',
      // });
    }
  }
}

export function* signIn({ data }) {
  try {
    const response = yield call(
      apiWrapper,
      { isShowProgress: true },
      login,
      data,
    );
    yield put(actions.signInSuccess(response.token, response.user));

    yield put(startup());
  } catch (err) {
    yield put(actions.signInFailure(err));
  }
}

export function* skipLogin() {
  yield put(startup());
}

export function* getUser() {
  try {
    const response = yield call(apiWrapper, { isShowProgress: true }, getInfo);
    if (!response) {
      yield put(actions.editUserFailure(response));
      return;
    }
    yield put(actions.editUserSuccess(response));
  } catch (err) {
    yield put(actions.editUserFailure(err));
  }
}

export function* editUserSaga({ data }) {
  try {
    const response = yield call(editUser, { ...data });
    if (!response || !response.success) {
      yield put(actions.editUserFailure(response));
      return;
    }
    yield put(actions.editUserSuccess(response.data));
  } catch (err) {
    yield put(actions.editUserFailure(err));
  }
}

export function* changePassword({ data }) {
  try {
    const response = yield call(updatePassword, data);
    if (!response || !response.success) {
      yield put(actions.editUserFailure(response));
      return;
    }
    yield put(actions.editUserSuccess(response.user));
  } catch (err) {
    yield put(actions.editUserFailure(err));
  }
}

export function* fbSignIn() {
  try {
    // const accessToken = yield call(facebookSignInApi);
    const accessToken = '';
    // showProgress(true);
    const response = yield call(loginFacebook, accessToken);
    // showProgress(false);
    if (response && !response.token) {
      yield put(actions.signInFailure(response));
      return;
    }
    yield put(actions.signInSuccess(response.token, response.user));
    global.token = response.token;
    // yield put(actions.getUser());
    yield put(startup());
  } catch (err) {
    // showProgress(false);
    yield put(actions.signInFailure(err));
  }
}

export default [
  takeLatest(actions.signUp().type, signUp),
  takeLatest(actions.signIn().type, signIn),
  takeLatest(actions.signOut().type, signOut),
  takeLatest(actions.getUser().type, getUser),
  takeLatest(actions.editUser().type, editUserSaga),
  takeLatest(actions.fbSignIn().type, fbSignIn),
  takeLatest(actions.skipLogin().type, skipLogin),
];
