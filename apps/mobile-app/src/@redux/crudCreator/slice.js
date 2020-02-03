import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { DEFERRED } from '../ExposedPromiseMiddleware';

export const PRIMARY_KEY = 'id';

export const INITIAL_STATE = {
  loading: false,
  itemLoadings: {},
  error: null,
  data: {},
  ids: [],
  currentId: null,
  filter: {},
  page: 1,
  pageSize: 10,
  total: 0,
  numberOfPages: 1,
  sort: '',
};

// getAll

export const getAll = (state, { payload: { data = {}, options = {} } }) => {
  if (options.isRefresh) {
    state = {
      ...INITIAL_STATE,
      loading: true,
      ...data,
    };
  } else {
    state = {
      ...state,
      loading: true,
      error: null,
      page: state.page + 1,
      ...data,
    };
  }
};

export const getAllSuccess = (state, { payload: { data } }) => {
  state.loading = false;
  state.ids = [...state.ids, ...data.ids];
  state.data = { ...state.data, ...data.data };
  state.total = data.total;
  state.numberOfPages = data.numberOfPages;
};

export const getAllFailure = (state, { payload: { data } }) => {
  state.loading = false;
  state.error = [...state.ids, ...data.ids];
  state.data = data;
  state.total = data.total;
  state.numberOfPages = data.numberOfPages;
};

// getOne

export const getDataById = (state, { payload: { data } }) => {
  state.currentId = data[PRIMARY_KEY];
  state.loading = true;
};

export const getDataByIdSuccess = (state, { payload: { data } }) => {
  state.data = { ...state.data, [data[PRIMARY_KEY]]: data };
  state.loading = false;
};

export const getDataByIdFailure = (state, { payload: { data } }) => {
  state.error = data;
  state.loading = false;
};

export const create = state => {
  state.error = null;
  state.loading = false;
};

export const createSuccess = (state, { payload: { data } }) => {
  state.data = { ...state.data, [data[PRIMARY_KEY]]: data };
  state.loading = false;
  state.ids = [...state.ids, data[PRIMARY_KEY]];
  state.currentId = data.id;
  state.error = null;
};

export const createFailure = (state, { payload: { data } }) => {
  state.error = data;
  state.loading = false;
};

// Edit

export const edit = (state, { payload: { data } }) => {
  state.error = null;
  state.loading = true;
  state.itemLoadings = { ...state.itemLoadings, [data[PRIMARY_KEY]]: true };
};

export const editSuccess = (state, { payload: { data } }) => {
  state.error = null;
  state.loading = true;
  state.data = {
    ...state.data,
    [data[PRIMARY_KEY]]: { ...state.data[data[PRIMARY_KEY]], ...data },
  };
  state.itemLoadings = { ...state.itemLoadings, [data[PRIMARY_KEY]]: false };
};

export const editFailure = (state, { payload: { data } }) => {
  state.error = data;
  state.itemLoadings = { ...state.itemLoadings, [data[PRIMARY_KEY]]: false };
};

// Delete

export const del = (state, { payload: { data } }) => {
  state.error = null;
  state.itemLoadings = data[PRIMARY_KEY]
    ? { ...state.itemLoadings, [data[PRIMARY_KEY]]: true }
    : null;
};

export const delSuccess = (state, { payload: { data } }) => {
  delete stateData[data[PRIMARY_KEY]];
  state.error = null;
  state.currentId = null;
  state.itemLoadings = data[PRIMARY_KEY]
    ? { ...state.itemLoadings, [data[PRIMARY_KEY]]: null }
    : null;
  state.ids = _.xor(state.ids, [data[PRIMARY_KEY]]);
  state.data = data[PRIMARY_KEY] ? stateData : null;
};

export const delFailure = (state, { payload: { data } }) => {
  delete stateData[data[PRIMARY_KEY]];
  state.error = data;
  state.itemLoadings = data[PRIMARY_KEY]
    ? { ...state.itemLoadings, [data[PRIMARY_KEY]]: null }
    : null;
};

export const makeCRUDSlice = (model, customAction = {}) => {
  const reducers = {
    getAll: {
      reducer: getAll,
      prepare: data => ({
        payload: data || {},
        [DEFERRED]: true,
      }),
    },
    getAllFailure,
    getAllSuccess,
    create: {
      reducer: create,
      prepare: data => ({
        payload: data || {},
        [DEFERRED]: true,
      }),
    },
    createFailure,
    createSuccess,
    edit: {
      reducer: edit,
      prepare: data => ({
        payload: data || {},
        [DEFERRED]: true,
      }),
    },
    editFailure,
    editSuccess,
    del: {
      reducer: del,
      prepare: data => ({
        payload: {
          ...data,
        },
        [DEFERRED]: true,
      }),
    },
    delSuccess,
    delFailure,
    getDataById: {
      reducer: getDataById,
      prepare: data => ({
        payload: {
          ...data,
        },
        [DEFERRED]: true,
      }),
    },
    getDataByIdFailure,
    getDataByIdSuccess,
    ...customAction,
  };

  const modelSlice = createSlice({
    name: model,
    initialState: INITIAL_STATE,
    reducers,
  });
  return modelSlice;
};

export default makeCRUDSlice;
