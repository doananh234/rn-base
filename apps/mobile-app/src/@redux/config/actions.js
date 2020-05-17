import { createAsyncThunk } from '@reduxjs/toolkit';
// import api
import { apiWrapper } from 'utils/reduxUtils';
import { getConfigApi } from 'api/configs';

export const getConfig = createAsyncThunk(
  'config/getConfig',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, getConfigApi);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  },
);
