import React, {Component} from 'react';
import {unionBy} from 'lodash';
import PropTypes from 'prop-types';
import {View, FlatList, StyleSheet} from 'react-native';
import ProgressScreen from './ProgressScreen';
import Divider from './Divider';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.itemRendered = [];
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95,
    };
  }

  componentDidUpdate(prevProps) {
    const {data} = this.props;
    if (prevProps.data.length === 0 && data.length > 0) {
      this.itemRendered = [];
    }
  }

  onViewableItemsChanged = e => {
    const {data, loadMore} = this.props;
    this.itemRendered = unionBy(this.itemRendered, e.viewableItems, 'key');
    if (this.itemRendered.length > data.length - 2) {
      loadMore();
    }
  };

  onRefresh = () => {
    const {onRefresh} = this.props;
    this.itemRendered = [];
    onRefresh();
  };

  renderFooter = () => {
    const {
      refreshing,
      data,
      // LoadingItem, loadingMore,
    } = this.props;
    // if (LoadingItem && loadingMore) {
    //   return (
    //     <View>
    //       <LoadingItem />
    //       <LoadingItem />
    //       <LoadingItem />
    //       <LoadingItem />
    //       <LoadingItem />
    //     </View>
    //   );
    // }
    return (
      <View>
        {refreshing && data.length > 0 && (
          <ProgressScreen isFullScreen={false} />
        )}
      </View>
    );
  };

  render() {
    const {refreshing} = this.props;
    return (
      <FlatList
        style={styles.styles}
        {...this.props}
        onRefresh={
          typeof refreshing !== 'undefined' ? this.onRefresh : undefined
        }
        viewabilityConfig={this.viewabilityConfig}
        onViewableItemsChanged={this.onViewableItemsChanged}
        ListFooterComponent={this.renderFooter}
        ItemSeparatorComponent={() => <Divider />}
      />
    );
  }
}
ListView.propTypes = {
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  data: PropTypes.array,
};

const styles = StyleSheet.create({});

export default ListView;
