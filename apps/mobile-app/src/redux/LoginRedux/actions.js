import {makeActionCreator, makeConstantCreator} from '../../utils/reduxUtils';

export const LoginTypes = makeConstantCreator(
  'CLOSE_FIRST_TIME',
  'SIGN_IN',
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAILURE',

  'USER_GET_INFOR',
  'USER_GET_INFOR_SUCCESS',
  'USER_GET_INFOR_FAILURE',

  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAILURE',

  // 'USER_FORGOT',
  // 'USER_FORGOT_SUCCESS',
  // 'USER_FORGOT_FAILURE',

  'GOOGLE_LOGIN',
  'GOOGLE_LOGIN_SUCCESS',
  'GOOGLE_LOGIN_FAILURE',

  'FB_LOGIN',
  'FB_LOGIN_SUCCESS',
  'FB_LOGIN_FAILURE',

  'TWITTER_LOGIN',
  'TWITTER_LOGIN_SUCCESS',
  'TWITTER_LOGIN_FAILURE',

  'SIGN_OUT',
  'CHANGE_PASSWORD',
  'GET_USE',
  'EDIT_USER',
  'UPDATE_USER_SUCCESS',
  'UPDATE_USER_FAILURE',

  'SKIP_LOGIN',
);

const skipLogin = () => makeActionCreator(LoginTypes.SKIP_LOGIN);
const closeFirstTime = () => makeActionCreator(LoginTypes.CLOSE_FIRST_TIME);
const signOut = data => makeActionCreator(LoginTypes.SIGN_OUT, {data});
const signIn = data => makeActionCreator(LoginTypes.SIGN_IN, {data});
const signInSuccess = (token, data) =>
  makeActionCreator(LoginTypes.SIGN_IN_SUCCESS, {token, data});
const signInFailure = error =>
  makeActionCreator(LoginTypes.SIGN_IN_FAILURE, {error});

const signUp = data => makeActionCreator(LoginTypes.SIGN_UP, {data});
const signUpSuccess = (token, data) =>
  makeActionCreator(LoginTypes.SIGN_UP_SUCCESS, {token, data});
const signUpFailure = error =>
  makeActionCreator(LoginTypes.SIGN_UP_FAILURE, {error});

const getUser = data => makeActionCreator(LoginTypes.GET_USE, {data});
const editUser = data => makeActionCreator(LoginTypes.EDIT_USER, {data});
const updateUserSuccess = data =>
  makeActionCreator(LoginTypes.UPDATE_USER_SUCCESS, {data});
const updateUserFailure = errorCode =>
  makeActionCreator(LoginTypes.UPDATE_USER_FAILURE, {errorCode});

const changePassword = data =>
  makeActionCreator(LoginTypes.CHANGE_PASSWORD, {data});

const fbSignIn = () => makeActionCreator(LoginTypes.FB_LOGIN);
const fbSignInSuccess = (token, data) =>
  makeActionCreator(LoginTypes.FB_LOGIN_SUCCESS, {token, data});
const fbSignInFailure = errorCode =>
  makeActionCreator(LoginTypes.FB_LOGIN_FAILURE, {errorCode});

export default {
  closeFirstTime,
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  // forgotPassword,
  // forgotPasswordSuccess,
  // forgotPasswordFailure,
  getUser,
  changePassword,
  editUser,
  updateUserFailure,
  updateUserSuccess,
  signOut,
  fbSignIn,
  fbSignInSuccess,
  fbSignInFailure,
  skipLogin,
};
