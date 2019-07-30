import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/reduxUtils';
import {
  makeCRUDReducerCreator,
  INITIAL_CRUD_STATE,
} from '../crudCreator/reducer';
import { MODEL, IGNORE_ACTIONS, DonatePlacesTypes } from './actions';

export const INITIAL_STATE = Immutable({
  ...INITIAL_CRUD_STATE,
});

const filterDonatePlace = (state, { data }) => state.merge({
    filterText: data,
  });

const reducer = makeReducerCreator(INITIAL_STATE, {
  ...makeCRUDReducerCreator(MODEL, IGNORE_ACTIONS),
  [DonatePlacesTypes.FILTER_DONATE_PLACE]: filterDonatePlace,
});

export default reducer;
