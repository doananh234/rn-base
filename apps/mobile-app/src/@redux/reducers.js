import auth from './AuthRedux/slice';
import password from './ForgotPasswordRedux/slice';
import app from './AppRedux/slice';
import series from './SeriesRedux/slice';
import filter from './FilterRedux/slice';

export default {
  app,
  password,
  auth,
  series,
  filter,
};
