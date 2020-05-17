import makeCRUDSlice from '@redux/crudCreator';
import { MODEL_NAME } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, seriesActions);

export default slice.reducer;
