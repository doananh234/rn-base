import { createSelector } from 'reselect';

const getTopSectionsData = state => state.groups.topSections;

export const getTopSections = createSelector(
  [getTopSectionsData],
  topSections => {
    const loadingData = Array.from('0123456789', x => ({
      id: x,
      isLoading: true,
    }));
    return topSections.map(section => ({
      ...section,
      data: section.data.length > 0 ? section.data : loadingData,
    }));
  },
);
