import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginApi,
  registerApi,
  getInfoApi,
  editUserApi,
  loginFacebookApi,
} from 'api/auth';
// import api
import { apiWrapper } from 'utils/reduxUtils';
import { startWithTabs } from 'navigation/navigationActions';
// import { startup } from '@redux/app/slice';

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        { isShowProgress: true },
        loginApi,
        payload,
      );

      if (response.token) {
        // thunkAPI.dispatch(startup());
        return response;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (payload, thunkAPI) => {
    try {
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        { isShowProgress: true },
        registerApi,
        payload,
      );

      if (response.token) {
        // thunkAPI.dispatch(startup());
        return response;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        { isShowProgress: true },
        getInfoApi,
        payload,
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const updateCurrentUser = createAsyncThunk(
  'auth/updateCurrentUser',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        { isShowProgress: false },
        editUserApi,
        payload,
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        { isShowProgress: false },
        updateCurrentUserApi,
        payload,
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const fbSignIn = createAsyncThunk(
  'auth/fbSignIn',
  async (payload, thunkAPI) => {
    try {
      // const accessToken = await facebookSignInApi();
      const accessToken = '';
      const response = await apiWrapper(
        { isShowProgress: false },
        loginFacebookApi,
        accessToken,
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const skipLogin = createAsyncThunk(
  'auth/skipLogin',
  async (payload, thunkAPI) => {
    try {
      startWithTabs();
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
