/* eslint no-alert: 0 */
import React, { Component } from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CheckUpdate from './CheckUpdate';
import { push } from '../../navigation/navigationActions';
import { Colors } from '../../themes';
import SummaryRow from './SummaryRow';
import Divider from '../../components/Divider';
import EmptyView from '../../components/EmptyView';
import HomeItem from '../../components/Items/HomeItem';

class Home extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidMount() {}

  navigationButtonPressed = ({ buttonId }) => {
    const { componentId } = this.props;
    if (buttonId === 'addBloodDonation') {
      push(componentId, 'addBloodDonation', {
        title: I18n.t('addBloodDonation.title'),
        topBar: { largeTitle: { visible: false } },
      });
    }
  };

  onPressItem = item => {
    const { componentId } = this.props;
    push(componentId, 'Detail', {
      passProps: {
        item,
        topBar: {
          background: {
            color: 'transparent',
          },
          largeTitle: {
            visible: false,
          },
        },
      },
    });
  };

  renderItem = ({ item }) => <HomeItem item={item} />;

  render() {
    const DATA = [
      {
        title: 'Egg-stuffed Avocado',
        value: '421',
      },

      {
        title: 'Egg-stuffed Avocado',
        value: '421',
      },

      {
        title: 'Egg-stuffed Avocado',
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
          renderItem={this.renderItem}
          data={DATA}
          style={styles.flatList}
          ListEmptyComponent={() => <EmptyView />}
        />
      </ScrollView>
    );
  }
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
  componentId: PropTypes.string,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
