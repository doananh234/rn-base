import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from 'themes';

const BackgroundImage = ({imageName}) => {
  return (
    <FastImage
      resizeMode="cover"
      style={styles.container}
      source={Images[imageName]}
    />
  );
};

BackgroundImage.propTypes = {
  imageName: PropTypes.any,
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
  },
});

export default BackgroundImage;
