import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from '../themes';
import ProgressScreen from './ProgressScreen';
import {safeArea} from '../utils/Devices';

export default class Container extends PureComponent {
  render() {
    const {style, children, loading, largeTitle} = this.props;
    return (
      <View style={[styles.container, largeTitle && styles.largeTitle, style]}>
        {children}
        {loading && <ProgressScreen isFullScreen />}
      </View>
    );
  }
}

Container.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
  loading: PropTypes.bool,
  largeTitle: PropTypes.bool,
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: Colors.background,
    paddingTop: safeArea().navHeight,
  },
  largeTitle: {
    paddingTop: Platform.OS === 'ios' ? 0 : safeArea().navHeight,
  },
});
