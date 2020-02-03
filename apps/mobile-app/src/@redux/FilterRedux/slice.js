import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_STATE = { showType: 'map' };

const setDataShowTypeReducer = (state, { payload }) => {
  state.showType = payload;
};

const filterSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setDataShowType: setDataShowTypeReducer,
  },
});

const { actions, reducer } = filterSlice;
export const { setDataShowType } = actions;
export default reducer;
