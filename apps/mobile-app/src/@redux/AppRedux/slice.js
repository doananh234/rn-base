import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_STATE = { language: 'fr', loading: null, setting: {} };

const loadingReducer = state => {
  state.loading = true;
};
const clearLoadingReducer = state => {
  state.loading = false;
};

const setSettingReducer = (state, { payload }) => {
  state.setting = { ...state.setting, ...payload };
};
const setLocaleReducer = (state, { payload }) => {
  state.language = payload;
};

const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    startup: () => {},
    loading: loadingReducer,
    clearLoading: clearLoadingReducer,
    setSetting: setSettingReducer,
    setLocale: setLocaleReducer,
  },
});

const { actions, reducer } = appSlice;
export const {
  setLocale,
  setSetting,
  clearLoading,
  loading,
  startup,
} = actions;
export default reducer;
