import {
 createSelector,
} from 'reselect';
import {
 LOADING_ITEMS,
} from '../../localData';

const getRestData = (state, resources) => {
  return state[resources];
};

export const getCurrentId = (state, resources) => {
  return state[resources].currentId;
};

export const getDataArr = createSelector(
  [getRestData],
  resources => {
    const {
 data, ids, page, loading, numberOfPages,
} = resources;
    return (!loading && page < numberOfPages) || loading
      ? [...ids.map(id => data[id]), ...LOADING_ITEMS]
      : ids.map(id => data[id]);
  }
);

export const getDataWithoutLoadMore = createSelector(
  [getRestData],
  resources => {
    const { data, ids, loading } = resources;
    return loading ? [...ids.map(id => data[id]), ...LOADING_ITEMS] : ids.map(id => data[id]);
  }
);

export const getTotal = createSelector(
  [getRestData],
  resources => {
    const { total } = resources;
    return total;
  }
);

export const getCurrentData = createSelector(
  [getRestData],
  resources => {
    const { currentId, data } = resources;
    return data[currentId] || {};
  }
);

export const enabledLoadMore = createSelector(
  [getRestData],
  resources => {
    const { page, loading, numberOfPages } = resources;
    return !loading && page < numberOfPages;
  }
);

export const getLoading = createSelector(
  [getRestData],
  resources => {
    const { loading } = resources;
    return loading;
  }
);

export const getCurrentUser = state => {
  return state.login.data;
};
