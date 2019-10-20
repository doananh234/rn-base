import Immutable from 'seamless-immutable';
import {makeReducerCreator} from '../../utils/reduxUtils';
import {
  makeCRUDReducerCreator,
  INITIAL_CRUD_STATE,
} from '../crudCreator/reducer';
import {MODEL, IGNORE_ACTIONS, GroupsTypes} from './actions';

export const INITIAL_STATE = Immutable({
  ...INITIAL_CRUD_STATE,
  topSections: [
    {title: 'summary.pltTop', data: []},
    {title: 'summary.rbcTop', data: []},
  ],
});

const getSummarySuccess = (state, {data}) =>
  state.merge({
    ...data,
  });

const reducer = makeReducerCreator(INITIAL_STATE, {
  ...makeCRUDReducerCreator(MODEL, IGNORE_ACTIONS),
  [GroupsTypes.GET_GROUP_SUMMARY_SUCCESS]: getSummarySuccess,
});

export default reducer;
