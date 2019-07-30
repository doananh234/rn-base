import { createSelector } from 'reselect';
import { values } from 'lodash';
import { localSearch } from '../../utils/tools';

const getData = state => state.donatePlaces.data;
const getFilterText = state => state.donatePlaces.filterText;

export const getDonatePlaceArr = createSelector(
  [getData, getFilterText],
  (data, text = '') => {
    return text.length < 2 ? values(data) : localSearch(values(data), text);
  },
);
