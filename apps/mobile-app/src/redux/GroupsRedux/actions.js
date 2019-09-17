import {
 makeCRUDConstantCreator, makeCRUDActionsCreator,
} from '../crudCreator/actions';
import {
 makeActionCreator, makeConstantCreator,
} from '../../utils/reduxUtils';

export const MODEL = 'groups';
export const IGNORE_ACTIONS = [];
export const GroupsTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
  ...makeConstantCreator(
    'GET_GROUP_SUMMARY',
    'GET_GROUP_SUMMARY_SUCCESS',
    'GET_GROUP_SUMMARY_FAILURE',
  ),
};
const CRUDGroupsActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);

const getGroupSummary = () => makeActionCreator(GroupsTypes.GET_GROUP_SUMMARY);
const getGroupSummarySuccess = data => makeActionCreator(GroupsTypes.GET_GROUP_SUMMARY_SUCCESS, { data });
const getGroupSummaryFailure = error => makeActionCreator(GroupsTypes.GET_GROUP_SUMMARY_FAILURE, { error });
/**
 * getAllGroups({pageSize, page })
 * getByIdGroups(data)
 * createGroups(data)
 * deleteGroups()
 * editGroups(data)
 */
export default {
  ...CRUDGroupsActions,
  getGroupSummary,
  getGroupSummarySuccess,
  getGroupSummaryFailure,
};
