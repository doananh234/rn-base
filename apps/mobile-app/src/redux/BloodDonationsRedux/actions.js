import {
  makeCRUDConstantCreator,
  makeCRUDActionsCreator,
} from '../crudCreator/actions';

export const MODEL = 'bloodDonations';
export const IGNORE_ACTIONS = [];
export const BloodDonationsTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
};
const CRUDBloodDonationsActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
/**
 * getAllBloodDonations({pageSize, page })
 * getByIdBloodDonations(data)
 * createBloodDonations(data)
 * deleteBloodDonations()
 * editBloodDonations(data)
 */
export default {...CRUDBloodDonationsActions};
