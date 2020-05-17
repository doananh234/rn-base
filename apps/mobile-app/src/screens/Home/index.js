/* eslint no-alert: 0 */
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import HomeItem from 'components/Items/HomeItem';
import Divider from 'uikit/src/Divider';
import EmptyView from 'uikit/src/EmptyView';
import { Colors } from 'themes';
import { push } from 'navigation/navigationActions';
import { getAllSeries } from '@redux/series/actions';
import { useDispatch } from 'react-redux';
import CheckUpdate from './CheckUpdate';
import SummaryRow from './SummaryRow';
// import { push } from '../../navigation/actions';

function Home({ componentId }) {
  const dispatch = useDispatch();
  const onPressItem = useCallback(
    item => {
      push(componentId, 'Detail', { passProps: { item } });
    },
    [componentId],
  );

  const renderItem = ({ item }) => (
    <HomeItem data={item} onPress={onPressItem} />
  );

  const DATA = [
    {
      title: 'Egg-stuffed Avocado 1',
      value: '421',
    },

    {
      title: 'Egg-stuffed Avocado 2',
      value: '421',
    },

    {
      title: 'Egg-stuffed Avocado 3',
      value: '421',
    },
  ];

  useEffect(() => {
    dispatch(getAllSeries({ options: { isRefresh: true } }));
  }, [dispatch]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CheckUpdate />
      <SummaryRow />
      <FlatList
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={renderItem}
        data={DATA}
        style={styles.flatList}
        ListEmptyComponent={() => <EmptyView />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },
  content: {
    // paddingTop: safeArea().marginTop,
    paddingBottom: 20,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default React.memo(Home);
