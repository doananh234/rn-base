import { createSlice } from '@reduxjs/toolkit';
import { forgotPassword, verifyPassword, resetPassword } from './actions';

export const INITIAL_STATE = {
  data: {},
  error: null,
  loading: null,
  resetEmail: null,
  verifyToken: null,
};

const _forgotPassword = (state, { payload: { email } }) => {
  state.resetEmail = email;
};
const _forgotPasswordSuccess = () => {};
const _forgotPasswordFailure = () => {};

// TODO: Verify password
const _verifyPassword = (
  state,
  {
    meta: {
      // eslint-disable-next-line
      arg: { verify_token },
    },
  },
) => {
  // eslint-disable-next-line
  state.verifyToken = verify_token;
};
const _verifyPasswordSuccess = () => {};
const _verifyPasswordFailure = state => {
  state.verifyToken = null;
};
// TODO: Reset password
const _resetPassword = () => {};
const _resetPasswordSuccess = state => {
  state.resetEmail = null;
  state.verifyToken = null;
};
const _resetPasswordFailure = () => {};

const passwordSlice = createSlice({
  name: 'password',
  initialState: INITIAL_STATE,
  extraReducers: {
    [forgotPassword.pending]: _forgotPassword,
    [forgotPassword.fulfilled]: _forgotPasswordSuccess,
    [forgotPassword.rejected]: _forgotPasswordFailure,

    [verifyPassword.pending]: _verifyPassword,
    [verifyPassword.fulfilled]: _verifyPasswordSuccess,
    [verifyPassword.rejected]: _verifyPasswordFailure,

    [resetPassword.pending]: _resetPassword,
    [resetPassword.fulfilled]: _resetPasswordSuccess,
    [resetPassword.rejected]: _resetPasswordFailure,
  },
});

export const { reducer } = passwordSlice;
export default reducer;
