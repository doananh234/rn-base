import {
  makeCRUDConstantCreator,
  makeCRUDActionsCreator,
} from '../crudCreator/actions';
import {makeActionCreator, makeConstantCreator} from '../../utils/reduxUtils';

export const MODEL = 'users';
export const IGNORE_ACTIONS = [];
export const UsersTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
  ...makeConstantCreator(
    'SEARCH_USERS',
    'SEARCH_USERS_SUCCESS',
    'SEARCH_USERS_FAILURE',

    'GET_USER_DONATION',
    'GET_USER_DONATION_SUCCESS',
    'GET_USER_DONATION_FAILURE',
  ),
};
const CRUDUsersActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);

const searchUsers = data => makeActionCreator(UsersTypes.SEARCH_USERS, {data});
const searchUsersSuccess = (data, searchKeys) =>
  makeActionCreator(UsersTypes.SEARCH_USERS_SUCCESS, {data, searchKeys});
const searchUsersFailure = error =>
  makeActionCreator(UsersTypes.SEARCH_USERS_FAILURE, {error});

const getUserDonations = data =>
  makeActionCreator(UsersTypes.GET_USER_DONATION, {data});
const getUserDonationsSuccess = (data, searchKeys) =>
  makeActionCreator(UsersTypes.GET_USER_DONATION_SUCCESS, {data, searchKeys});
const getUserDonationsFailure = error =>
  makeActionCreator(UsersTypes.GET_USER_DONATION_FAILURE, {error});

/**
 * getAllUsers({pageSize, page })
 * getByIdUsers(data)
 * createUsers(data)
 * deleteUsers()
 * editUsers(data)
 */
export default {
  ...CRUDUsersActions,
  searchUsers,
  searchUsersSuccess,
  searchUsersFailure,

  getUserDonations,
  getUserDonationsSuccess,
  getUserDonationsFailure,
};
