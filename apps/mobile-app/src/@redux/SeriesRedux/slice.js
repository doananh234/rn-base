import { makeCRUDSlice } from '../crudCreator/slice';

export const RESOURCE = 'series';
const seriesSlice = makeCRUDSlice(RESOURCE);

export const { actions, reducer } = seriesSlice;

export const { getAll: getAllSeries } = actions;
export default reducer;
