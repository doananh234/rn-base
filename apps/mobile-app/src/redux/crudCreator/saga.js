import {
 takeLatest, put, call, fork, select,
} from 'redux-saga/effects';
import _ from 'lodash';
import {
 apiWrapper,
} from '../../utils/reduxUtils';
import {
 getAllApi, getDataByIdApi, postApi, putApi, delApi,
} from '../../api/crud';
import {
 makeActionName,
} from '../../utils/textUtils';
import {
 PRIMARY_KEY, CRUD_ACTIONS,
} from './actions';
// import { showInAppNoti } from '../../navigation/navigationActions';
import {
 convertResponseData, convertRequestParams,
} from './dataProvider';
import {
 DEFERRED,
} from '../ExposedPromiseMiddleware';

function* getAllSaga(data, options = {}, resource, successAction, failureAction) {
  try {
    const { pageSize, page, filter } = yield select(state => state[resource]);
    const convertRequest = convertRequestParams(
      'GET_ALL',
      {
        limit: pageSize,
        offset: pageSize * (page - 1),
        filter,
        ...data,
      },
      resource
    );
    const response = yield call(
      apiWrapper,
      { isShowProgress: options.isShowProgress },
      getAllApi,
      options.customApiResource || resource,
      convertRequest
    );
    const result = convertResponseData('GET_ALL', response);
    if (result.data) {
      yield put(
        successAction({
          numberOfPages: Math.round(result.total / pageSize),
          ...result,
        })
      );
    } else {
      // showInAppNoti('', response.message, 'error');
      yield put(failureAction(response));
    }
  } catch (error) {
    // showInAppNoti({ title: null, content: 'Something wrong!', type: 'error' });
    yield put(failureAction(error));
  }
}

function* getDataByIdSaga(
  data,
  options = { isRequestApi: true },
  resource,
  successAction,
  failureAction
) {
  try {
    if (!options.isRequestApi) {
      yield put(successAction(data));
      return;
    }
    const response = yield call(
      apiWrapper,
      { isShowProgress: options.isShowProgress },
      getDataByIdApi,
      options.customApiResource || resource,
      data[PRIMARY_KEY]
    );
    const result = convertResponseData('GET_BY_ID', response);
    if (result) {
      yield put(successAction(result));
    } else {
      yield put(failureAction(result));
    }
  } catch (error) {
    yield put(failureAction(error));
  }
}
// function* editSaga(data, resource, successAction, failureAction, getOne)
function* editSaga(data, options = {}, resource, successAction, failureAction, getOne, deferred) {
  // delete data.c
  try {
    const response = yield call(
      apiWrapper,
      { isShowProgress: options.isShowProgress },
      putApi,
      options.customApiResource || resource,
      data[PRIMARY_KEY],
      data
    );
    const result = convertResponseData('EDIT', response);
    if (result) {
      yield put(successAction({ ...data, ...result }));
      // yield put(successAction({ ...data, ...result }));
      deferred.resolve({ ...data, ...result });
    } else {
      yield put(failureAction({ ...data, ...response }));
      deferred.reject({ ...data, ...response });
    }
  } catch (error) {
    yield put(failureAction(error));
    deferred.reject(error);
    //
  }
}

function* createSaga(data, options = {}, resource, successAction, failureAction, deferred) {
  try {
    const response = yield call(
      apiWrapper,
      { isShowProgress: options.isShowProgress },
      postApi,
      options.customApiResource || resource,
      data
    );
    const result = convertResponseData('CREATE', response);
    if (result) {
      yield put(successAction(result));
      deferred.resolve(result);
    } else {
      // showInAppNoti({ title: null, content: response.message, type: 'error' });
      yield put(failureAction(response));
      deferred.reject(response);
    }
  } catch (error) {
    yield put(failureAction(error));
    deferred.reject(error);
  }
}

function* delSaga(data, options = {}, resource, successAction, failureAction, deferred) {
  try {
    const response = yield call(
      apiWrapper,
      { isShowProgress: true },
      delApi,
      options.customApiResource || resource,
      data.path || data[PRIMARY_KEY]
    );
    const result = convertResponseData('DELETE', response);
    if (result.success) {
      yield put(successAction(data));
      deferred.resolve(result || {});
    } else {
      yield put(failureAction(response));
      deferred.reject(response);
    }
  } catch (error) {
    yield put(failureAction(error));
    deferred.reject(error);
  }
}

const makeCRUDSagaCreator = (resource, actions) => {
  function* getAllSagaCreator({ data, options }) {
    yield fork(
      getAllSaga,
      data,
      options,
      resource,
      actions[makeActionName(`GET_ALL_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`GET_ALL_${_.snakeCase(resource).toUpperCase()}_FAILURE`)]
    );
  }
  function* getDataByIdSagaCreator({ data, options }) {
    yield fork(
      getDataByIdSaga,
      data,
      options,
      resource,
      actions[makeActionName(`GET_BY_ID_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`GET_BY_ID_${_.snakeCase(resource).toUpperCase()}_FAILURE`)]
    );
  }
  function* editSagaCreator({ data, options, [DEFERRED]: deferred }) {
    yield fork(
      editSaga,
      data,
      options,
      resource,
      actions[makeActionName(`EDIT_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`EDIT_${_.snakeCase(resource).toUpperCase()}_FAILURE`)],
      getDataByIdSaga,
      deferred
    );
  }
  function* deleteSagaCreator({ data, options, [DEFERRED]: deferred }) {
    yield fork(
      delSaga,
      data,
      options,
      resource,
      actions[makeActionName(`DELETE_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`DELETE_${_.snakeCase(resource).toUpperCase()}_FAILURE`)],
      deferred
    );
  }
  function* createSagaCreator({ data, options, [DEFERRED]: deferred }) {
    yield fork(
      createSaga,
      data,
      options,
      resource,
      actions[makeActionName(`CREATE_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`CREATE_${_.snakeCase(resource).toUpperCase()}_FAILURE`)],
      deferred
    );
  }
  const sagas = {
    GET_ALL: getAllSagaCreator,
    GET_BY_ID: getDataByIdSagaCreator,
    EDIT: editSagaCreator,
    DELETE: deleteSagaCreator,
    CREATE: createSagaCreator,
  };
  return sagas;
};

const rootCRUDSaga = (resource, ignoreActions = [], actions) => {
  const sagaCreators = makeCRUDSagaCreator(resource, actions);
  const acceptActions = _.xor(CRUD_ACTIONS, ignoreActions);
  return acceptActions.map(data => takeLatest(`${data}_${_.snakeCase(resource).toUpperCase()}`, sagaCreators[data]));
};

export default rootCRUDSaga;
