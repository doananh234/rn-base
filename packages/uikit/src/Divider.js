import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'themes';

const Divider = ({style}) => {
  return <View style={[styles.container, style]} />;
};
Divider.propTypes = {
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.divider,
  },
});

export default Divider;
