import { apiWrapper } from 'utils/reduxUtils';
import {
  verifyPasswordTokenApi,
  forgotPasswordApi,
  newPasswordApi,
} from 'api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const forgotPassword = createAsyncThunk(
  'password/forgotPassword',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        { isShowProgress: true },
        forgotPasswordApi,
        payload,
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const verifyPassword = createAsyncThunk(
  'password/verifyPassword',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        { isShowProgress: true },
        verifyPasswordTokenApi,
        payload,
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const resetPassword = createAsyncThunk(
  'password/resetPassword',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        { isShowProgress: true },
        newPasswordApi,
        payload,
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
