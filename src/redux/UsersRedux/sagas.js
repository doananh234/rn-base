import { call, put, takeLatest } from 'redux-saga/effects';
import { keyBy } from 'lodash';
import moment from 'moment';
import UsersActions, { MODEL, IGNORE_ACTIONS, UsersTypes } from './actions';
import rootCRUDSaga from '../crudCreator/saga';
import { getAllApi } from '../../api/crud';
// use IGNORE_SAGAS to replace "saga" or ignore "saga"
// IGNORE_SAGAS = ['GET_ALL', 'GET_BY_ID', 'DELETE', 'EDIT', 'CREATE'];

const IGNORE_SAGAS = IGNORE_ACTIONS;

export function* searchUsersSaga({ data }) {
  try {
    const response = yield call(getAllApi, 'users', {
      filter: JSON.stringify({
        fullName: { $like: `${data}` },
        continueTime: { $lte: moment().toISOString() },
      }),
      limit: 10,
      offset: 0,
    });
    if (response.code) {
      yield put(UsersActions.searchUsersFailure(response));
      return;
    }
    yield put(
      UsersActions.searchUsersSuccess(
        keyBy(response.results, 'id'),
        response.results.map(item => item.id),
      ),
    );
  } catch (err) {
    yield put(UsersActions.searchUsersFailure(err));
  }
}
export default [
  ...rootCRUDSaga(MODEL, IGNORE_SAGAS, UsersActions),
  takeLatest(UsersTypes.SEARCH_USERS, searchUsersSaga),
];
