import {makeActionCreator, makeConstantCreator} from '../../utils/reduxUtils';

export const Types = makeConstantCreator(
  'START_UP',
  'LOADING',
  'CLEAR_LOADING',
  'SET_SETTING',
);

const startup = () => makeActionCreator(Types.START_UP);
export const loading = () => makeActionCreator(Types.LOADING);
export const clearLoading = () => makeActionCreator(Types.CLEAR_LOADING);
export const setSetting = data => makeActionCreator(Types.SET_SETTING, {data});

export default {
  startup,
  loading,
  clearLoading,
  setSetting,
};
