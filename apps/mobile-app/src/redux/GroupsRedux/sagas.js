import {
 call, put, takeLatest, all,
} from 'redux-saga/effects';
import GroupsActions, {
 MODEL, IGNORE_ACTIONS, GroupsTypes,
} from './actions';
import rootCRUDSaga from '../crudCreator/saga';
import {
 getGroupSummary, getPltTop, getRbcTop,
} from '../../api/summary';
// use IGNORE_SAGAS to replace "saga" or ignore "saga"
// IGNORE_SAGAS = ['GET_ALL', 'GET_BY_ID', 'DELETE', 'EDIT', 'CREATE'];

const IGNORE_SAGAS = IGNORE_ACTIONS;

export function* getGroupSummarySaga() {
  try {
    const response = yield all([
      yield call(getGroupSummary),
      yield call(getPltTop),
      yield call(getRbcTop),
    ]);
    if (response.code) {
      yield put(GroupsActions.getGroupSummaryFailure(response));
      return;
    }
    const results = {
      summaries: response[0],
      topSections: [
        { title: 'summary.pltTop', data: response[1].results },
        { title: 'summary.rbcTop', data: response[2].results },
      ],
    };
    yield put(GroupsActions.getGroupSummarySuccess(results));
  } catch (err) {
    yield put(GroupsActions.getGroupSummaryFailure(err));
  }
}

export default [
  ...rootCRUDSaga(MODEL, IGNORE_SAGAS, GroupsActions),
  takeLatest(GroupsTypes.GET_GROUP_SUMMARY, getGroupSummarySaga),
];
