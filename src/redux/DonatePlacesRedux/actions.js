import {
  makeCRUDConstantCreator,
  makeCRUDActionsCreator,
} from '../crudCreator/actions';
import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const MODEL = 'donatePlaces';
export const IGNORE_ACTIONS = [];
export const DonatePlacesTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
  ...makeConstantCreator('FILTER_DONATE_PLACE'),
};
const CRUDDonatePlacesActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
const filterDonatePlace = data => makeActionCreator(DonatePlacesTypes.FILTER_DONATE_PLACE, { data });
/**
 * getAllDonatePlaces({pageSize, page })
 * getByIdDonatePlaces(data)
 * createDonatePlaces(data)
 * deleteDonatePlaces()
 * editDonatePlaces(data)
 */
export default { ...CRUDDonatePlacesActions, filterDonatePlace };
