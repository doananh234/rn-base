import { createSlice } from '@reduxjs/toolkit';
import { getConfig } from './actions';

export const initialState = {};

const { reducer } = createSlice({
  name: 'Config',
  initialState,
  reducers: {},
  extraReducers: {
    [getConfig.fulfilled]: (state, { payload }) => {
      state.data = payload;
    },
    [getConfig.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export default reducer;
