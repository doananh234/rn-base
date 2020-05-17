import { makeActions } from '@redux/crudCreator/actions';

export const MODEL_NAME = 'series';
export const seriesActions = makeActions(MODEL_NAME);

export const getAllSeries = seriesActions.getAll;
export const editSeries = seriesActions.edit;
export const createSeries = seriesActions.create;
export const getByIdSeries = seriesActions.getDataById;
