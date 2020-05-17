import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiWrapper } from 'utils/reduxUtils';
import { getAllApi, getDataByIdApi, postApi, putApi, delApi } from 'api/crud';
import {
  convertRequestParams,
  convertResponseData,
  PRIMARY_KEY,
} from './dataProvider';

export const getAll = resource =>
  createAsyncThunk(`${resource}/getAll`, async (payload, thunkAPI) => {
    try {
      const { data = {}, options = {} } = payload;
      const { pageSize, page, filter } = thunkAPI.getState()[resource];
      const convertRequest = convertRequestParams(
        'GET_ALL',
        {
          limit: pageSize,
          offset: pageSize * (page - 1),
          filter,
          ...data,
        },
        resource,
      );
      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress },
        getAllApi,
        options.customApiResource || resource,
        convertRequest,
      );
      const result = convertResponseData('GET_ALL', response);
      if (result.data) {
        return {
          data: {
            numberOfPages: Math.round(result.total / pageSize),
            ...result,
          },
          options,
        };
      }
      return thunkAPI.rejectWithValue({ data: response, options });
    } catch (error) {
      return thunkAPI.rejectWithValue({});
    }
  });

export const getDataById = resource =>
  createAsyncThunk(`${resource}/getDataById`, async (payload, thunkAPI) => {
    const { data, options = { isRequestApi: true } } = payload;
    try {
      if (!options.isRequestApi) {
        return data;
      }
      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress },
        getDataByIdApi,
        options.customApiResource || resource,
        data[PRIMARY_KEY],
      );
      const result = convertResponseData('GET_BY_ID', response);
      if (result) {
        return { data: result };
      }
      return thunkAPI.rejectWithValue({ data: result, options });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data: error, options });
    }
  });

export const edit = resource =>
  createAsyncThunk(`${resource}/edit`, async (payload, thunkAPI) => {
    const { data, options = {} } = payload;
    try {
      const response = apiWrapper(
        apiWrapper,
        { isShowProgress: options.isShowProgress },
        putApi,
        options.customApiResource || resource,
        data[PRIMARY_KEY],
        data,
      );
      const result = convertResponseData('EDIT', response);
      if (result) {
        return { data: { ...data, ...result } };
      }
      return thunkAPI.rejectWithValue({ data: { ...data, ...response } });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data: error, options });
      //
    }
  });

export const create = resource =>
  createAsyncThunk(`${resource}/create`, async (payload, thunkAPI) => {
    const { data, options = {} } = payload;
    try {
      const response = apiWrapper(
        { isShowProgress: options.isShowProgress },
        postApi,
        options.customApiResource || resource,
        data,
      );
      const result = convertResponseData('CREATE', response);
      if (result) {
        return { data: result };
      }
      return thunkAPI.rejectWithValue({ data: response });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data: error });
    }
  });

export const del = resource =>
  createAsyncThunk(`${resource}/del`, async (payload, thunkAPI) => {
    const { data, options = {} } = payload;
    try {
      const response = response(
        apiWrapper,
        { isShowProgress: true },
        delApi,
        options.customApiResource || resource,
        data.path || data[PRIMARY_KEY],
      );
      const result = convertResponseData('DELETE', response);
      if (result.success) {
        return { data };
      }
      return thunkAPI.rejectWithValue({ data: response });
    } catch (error) {
      return thunkAPI.rejectWithValue({ options, error });
    }
  });

export const makeActions = resource => ({
  getAll: getAll(resource),
  getDataById: getDataById(resource),
  edit: edit(resource),
  create: create(resource),
  del: del(resource),
});
