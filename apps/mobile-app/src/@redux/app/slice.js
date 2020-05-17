import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { startWithTabs, startStackScreen } from 'navigation/navigationActions';

export const INITIAL_STATE = { language: 'fr', loading: null, setting: {} };

export const startup = createAsyncThunk(
  'app/startup',
  async (payload, thunkAPI) => {
    try {
      const { token, isSkipLogin } = thunkAPI.getState().auth;
      token || isSkipLogin ? startWithTabs() : startStackScreen();
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

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
  extraReducers: {
    [startup.fulfilled]: () => {},
  },
});

const { actions, reducer } = appSlice;
export const { setLocale, setSetting, clearLoading, loading } = actions;
export default reducer;
