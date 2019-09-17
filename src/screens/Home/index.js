/* eslint no-alert: 0 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';
import HomeItem from '../../components/Items/HomeItem';
import Divider from '../../ui/Divider';
import EmptyView from '../../ui/EmptyView';
import CheckUpdate from './CheckUpdate';
import { Colors } from '../../themes';
import SummaryRow from './SummaryRow';
// import { push } from '../../navigation/actions';

function Home() {
  const { push } = useNavigation();
  const isLogged = useSelector(state => state.login.isLogged);

  const onPressItem = useCallback(
    item => {
      push('Detail', item);
    },
    [],
  );

  const renderItem = ({ item }) => <HomeItem data={item} onPress={onPressItem} />;

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
