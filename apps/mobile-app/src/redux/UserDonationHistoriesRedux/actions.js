import {
  makeCRUDConstantCreator,
  makeCRUDActionsCreator,
} from '../crudCreator/actions';

export const MODEL = 'userDonationHistories';
export const IGNORE_ACTIONS = [];
export const UserDonationHistoriesTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
};
const CRUDUserDonationHistoriesActions = makeCRUDActionsCreator(
  MODEL,
  IGNORE_ACTIONS,
);
/**
 * getAllUserDonationHistories({pageSize, page })
 * getByIdUserDonationHistories(data)
 * createUserDonationHistories(data)
 * deleteUserDonationHistories()
 * editUserDonationHistories(data)
 */
export default { ...CRUDUserDonationHistoriesActions };
