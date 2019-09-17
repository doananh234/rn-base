import {
 createSelector,
} from 'reselect';

const getRestData = state => state.users.data;
const getSearchKeys = state => state.users.searchKeys;

export const getSearchUsersResults = createSelector(
  [getRestData, getSearchKeys],
  (data, searchKeys) => {
    return searchKeys ? searchKeys.map(id => data[id]) : [];
  },
);
