import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_STATE = {
  data: {},
  error: null,
  loading: null,
  resetEmail: null,
  verifyToken: null,
};

const forgotPassword = (state, { payload: { email } }) => {
  state.resetEmail = email;
};
const forgotPasswordSuccess = () => {};
const forgotPasswordFailure = () => {};

// TODO: Verify password
const verifyPassword = (state, { payload: { verify_token } }) => {
  state.verifyToken = verify_token;
};
const verifyPasswordSuccess = () => {};
const verifyPasswordFailure = state => {
  state.verifyToken = null;
};
// TODO: Reset password
const resetPassword = () => {};
const resetPasswordSuccess = state => {
  state.resetEmail = null;
  state.verifyToken = null;
};
const resetPasswordFailure = () => {};

const passwordSlice = createSlice({
  name: 'password',
  initialState: INITIAL_STATE,
  reducers: {
    forgotPassword,
    forgotPasswordFailure,
    forgotPasswordSuccess,
    resetPassword,
    resetPasswordFailure,
    resetPasswordSuccess,
    verifyPassword,
    verifyPasswordSuccess,
    verifyPasswordFailure,
  },
});

export const { actions, reducer } = passwordSlice;
export default reducer;
