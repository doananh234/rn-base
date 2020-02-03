import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_STATE = {
  data: {},
  error: null,
  loading: null,
  isLogged: false,
  isLogin: false,
  signInType: null,
  token: null,
  isFirstTime: true,
  isPremium: false,
  expired_date: '2018-09-26T10:04:28.550Z',
  setting: {},
  isSkipLogin: false,
};

const signOut = state => {
  state = {
    ...state,
    error: null,
    signInType: null,
    fbToken: null,
    isLogged: false,
    isLogin: false,
    token: null,
    data: {},
    isSkipLogin: false,
  };
};

const signUp = state => {
  state = {
    ...state,
    error: null,
    signInType: null,
    fbToken: null,
    isLogin: true,
    googleToken: null,
    emailToken: null,
    loading: true,
  };
};

const signUpSuccess = (state, { payload: { data, token } }) => {
  state.data = data;
  state.isLogin = true;
  state.token = token;
  state.loading = false;
};

const signUpFailure = (state, { payload: { error } }) => {
  state.isLogged = false;
  state.isLogin = true;
  state.error = error;
  state.loading = false;
};

const signIn = state => {
  state = {
    ...state,
    error: null,
    signInType: null,
    fbToken: null,
    isLogin: true,
    isLogged: false,
    loading: true,
    token: null,
  };
};

const signInSuccess = (state, { payload: { token, data } }) => {
  state.data = data;
  state.isLogin = true;
  state.token = token;
  state.loading = false;
  state.isLogged = isLogged;
};

const signInFailure = signUpFailure;

const getUser = state => {
  state.error = false;
  state.loading = true;
};

const editUser = (state, { payload: { data } }) => {
  state.data = { ...state.data, ...data };
  state.loading = true;
};

const editUserSuccess = (state, { payload: { data } }) => {
  state.data = data;
  state.error = false;
  state.loading = false;
};

const editUserFailure = (state, { payload: { error } }) => {
  state.error = error;
  state.loading = false;
};

const fbSignIn = state => {
  state = {
    ...state,
    isLogin: true,
    error: null,
    isLogged: false,
    token: null,
    loading: true,
  };
};

const fbSignInSuccess = signInSuccess;
const fbSignInFailure = signInFailure;

const skipLogin = state => {
  state.isSkipLogin = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    signUp,
    signUpSuccess,
    signUpFailure,
    signIn,
    signInSuccess,
    signInFailure,
    fbSignIn,
    fbSignInSuccess,
    fbSignInFailure,
    getUser,
    editUser,
    editUserSuccess,
    editUserFailure,
    skipLogin,
    signOut,
  },
});

export const { actions, reducer } = authSlice;
export default reducer;
