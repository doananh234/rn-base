import { call } from 'redux-saga/effects';
import _ from 'lodash';
// import { loading, clearLoading } from '../redux/app/actions';
// import {
//   dismissInAppNoti,
//   showProgress,
// } from '../navigation/navigationActions';

export function makeConstantCreator(...params) {
  const constant = {};
  _.each(params, param => {
    constant[param] = param;
  });
  return constant;
}

export const makeActionCreator = (type, params = null) => ({ type, ...params });

export const makeReducerCreator = (initialState = null, handlers = {}) => (
  state = initialState,
  action,
) => {
  if (!action && !action.type) {
    return state;
  }
  const handler = handlers[action.type];
  return (handler && handler(state, action)) || state;
};

// export function* apiWrapper(
//   config = {isShowProgress: true, isShowSuccessNoti: false},
//   apiFunc,
//   ...params
// ) {
//   try {
//     // dismissInAppNoti();
//     if (config.isShowProgress) {
//       // showProgress();
//       // yield put(loading());
//     }
//     const response = yield call(apiFunc, ...params);
//     // yield put(clearLoading());
//     // showProgress(false);
//     return response;
//   } catch (error) {
//     // showProgress(false);
//     // yield put(clearLoading());
//     return error;
//   }
// }

export async function apiWrapper(
  options = { isShowLoading: true, isShowSuccess: false },
  apiFunction,
  ...payload
) {
  try {
    const response = await apiFunction(...payload);
    return response;
  } catch (error) {
    // eslint-disable-next-line
    if (error?.response?.status == 401) {
      // window.location = '/login';
    }

    throw new Error(error);
  }
}

export const formattedData = (type, response, limit) => {
  switch (type) {
    case 'getAll':
      return {
        data: _.keyBy(response.results, 'id'),
        ids: _.map(response.results, item => item.id),
        count: response.total,
        pages: Math.floor(response.total / limit),
      };
    case 'getById':
      return response;
    default:
      return response;
  }
};
