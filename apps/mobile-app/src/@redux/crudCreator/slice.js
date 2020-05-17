import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { makeActions } from './actions';
import { PRIMARY_KEY } from './dataProvider';

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

export const getAll = (
  state,
  {
    meta: {
      arg: { data, options },
    },
  },
) => {
  if (options.isRefresh) {
    // eslint-disable-next-line
    state = {
      ...INITIAL_STATE,
      loading: true,
      ...data,
    };
  } else {
    // eslint-disable-next-line
    state = {
      ...state,
      loading: true,
      error: null,
      page: state.page + 1,
      ...data,
    };
  }
  return state;
};

export const getAllSuccess = (state, { payload: { data } }) => {
  state.loading = false;
  state.ids = [...state.ids, ...data.ids];
  state.data = { ...state.data, ...data.data };
  state.total = data.total;
  state.numberOfPages = data.numberOfPages;
};

export const getAllFailure = (state, { payload }) => {
  state.loading = false;
  state.error = payload?.data;
};

// getOne

export const getDataById = (
  state,
  {
    meta: {
      arg: { data },
    },
  },
) => {
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

export const edit = (
  state,
  {
    meta: {
      arg: { data },
    },
  },
) => {
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

export const del = (
  state,
  {
    meta: {
      arg: { data },
    },
  },
) => {
  state.error = null;
  state.itemLoadings = data[PRIMARY_KEY]
    ? { ...state.itemLoadings, [data[PRIMARY_KEY]]: true }
    : null;
};

export const delSuccess = (state, { payload: { data } }) => {
  delete state.data[data[PRIMARY_KEY]];
  state.error = null;
  state.currentId = null;
  state.itemLoadings = data[PRIMARY_KEY]
    ? { ...state.itemLoadings, [data[PRIMARY_KEY]]: null }
    : null;
  state.ids = _.xor(state.ids, [data[PRIMARY_KEY]]);
  state.data = data[PRIMARY_KEY] ? state.data : null;
};

export const delFailure = (state, { payload: { data } }) => {
  delete state.data[data[PRIMARY_KEY]];
  state.error = data;
  state.itemLoadings = data[PRIMARY_KEY]
    ? { ...state.itemLoadings, [data[PRIMARY_KEY]]: null }
    : null;
};

export const makeCRUDSlice = (
  model,
  actions,
  customActions = {},
  ignoreActions = [],
) => {
  const extraReducers = {
    [actions.getAll.pending]: getAll,
    [actions.getAll.fulfilled]: getAllSuccess,
    [actions.getAll.rejected]: getAllFailure,

    [actions.getDataById.pending]: getDataById,
    [actions.getDataById.fulfilled]: getDataByIdSuccess,
    [actions.getDataById.rejected]: getDataByIdFailure,

    [actions.create.pending]: create,
    [actions.create.fulfilled]: createSuccess,
    [actions.create.rejected]: createFailure,

    [actions.edit.pending]: edit,
    [actions.edit.fulfilled]: editSuccess,
    [actions.edit.rejected]: editFailure,

    [actions.del.pending]: del,
    [actions.del.fulfilled]: delSuccess,
    [actions.del.rejected]: delFailure,
  };

  ignoreActions.forEach(element => {
    const _ignoreActions = Object.keys(extraReducers).filter(
      key => key.indexOf(element) > -1,
    );
    _ignoreActions.forEach(e => {
      delete extraReducers[e];
    });
  });

  const slice = createSlice({
    name: model,
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: { ...extraReducers, ...customActions },
  });
  return slice;
};
