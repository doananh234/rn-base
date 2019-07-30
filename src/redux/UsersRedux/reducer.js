import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/reduxUtils';
import {
  makeCRUDReducerCreator,
  INITIAL_CRUD_STATE,
} from '../crudCreator/reducer';
import { MODEL, IGNORE_ACTIONS, UsersTypes } from './actions';

export const INITIAL_STATE = Immutable({
  ...INITIAL_CRUD_STATE,
  searchKeys: [],
  donationHistories: {},
  donationHistoryIds: [],
});

const searchUsers = state => state.merge({
    searchKeys: [],
  });

const searchUsersSuccess = (state, { data, searchKeys }) => state.merge({
    data: { ...state.data, ...data },
    searchKeys,
  });

const reducer = makeReducerCreator(INITIAL_STATE, {
  ...makeCRUDReducerCreator(MODEL, IGNORE_ACTIONS),
  [UsersTypes.SEARCH_USERS_SUCCESS]: searchUsersSuccess,
  [UsersTypes.SEARCH_USERS]: searchUsers,
});

export default reducer;
