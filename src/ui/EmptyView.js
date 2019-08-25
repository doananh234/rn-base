import React from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import Text from './Text';
import { Colors, Images } from '../themes';
import { safeArea } from '../utils/Devices';

const EmptyView = ({ text }) => {
  return (
    <View style={styles.container}>
      <FastImage style={styles.image} source={Images.empty} />
      <Text center type="body2" color={Colors.primaryText}>
        {I18n.t(text)}
      </Text>
    </View>
  );
};
EmptyView.propTypes = {
  text: PropTypes.string,
};

EmptyView.defaultProps = {
  text: 'empty.default',
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    minHeight: height - safeArea().navHeight,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width / 2,
    height: width / 2,
    marginBottom: 15,
  },
});

export default EmptyView;
