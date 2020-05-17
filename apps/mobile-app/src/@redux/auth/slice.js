import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  login,
  logout,
  updateCurrentUser,
  register,
  changePassword,
} from './actions';

export const initialState = {
  isAuthenticated: false,
  // isAuthenticated: true,
  data: {},
  role: null,
  loginError: false,
  loginSuccess: false,
  permissionData: null,
  // data test
  // deliveryAddress: {
  //   firstName: 'Kim',
  //   lastName: 'Nhi',
  //   city: 'Da Nang',
  //   district: 'Thanh Khe',
  //   state: 'Thach Gian',
  //   address: 'Nguyen Van Linh',
  //   country: 'Viet Name',
  //   zipCode: '50000',
  //   email: 'nhi.nguyen@enouvo.com',
  //   phoneNumber: '0397866938',
  // },
};

const { reducer } = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    getPermissionsSuccess: (state, { payload }) => {
      state.loading = false;
      state.permissionData = payload;
    },
    getPermissionsFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    subscribeUser: state => {
      state.loading = true;
    },
    subscribeUserSuccess: state => {
      state.loading = false;
    },
    subscribeUserFail: (state, { payload }) => {
      state.error = payload.error;
      state.loading = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = true;
      state.currentUser = payload;
      state.loginError = false;
      state.loginSuccess = true;
    },
    [login.rejected]: state => {
      state.isAuthenticated = false;
    },
    [register.pending]: state => {
      state.loading = true;
    },
    [register.fulfilled]: state => {
      state.loading = false;
    },
    [register.rejected]: state => {
      state.loading = false;
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.role = payload.systemRoleName;
    },
    [logout.fulfilled]: state => {
      state.isAuth = false;
      state.currentUser = null;
    },
    [updateCurrentUser.pending]: state => {
      state.loading = true;
    },
    [updateCurrentUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [updateCurrentUser.rejected]: state => {
      state.loading = false;
    },
    [changePassword.pending]: state => {
      state.loading = true;
    },
    [changePassword.fulfilled]: state => {
      state.loading = false;
    },
    [changePassword.rejected]: state => {
      state.loading = false;
    },
  },
});

export default reducer;
