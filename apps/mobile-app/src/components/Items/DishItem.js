import React from 'react';
import PropTypes from 'prop-types';
import {
 View, StyleSheet, Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/mealplanner';
import {
 Images, Colors,
} from 'themes';
import Text from '../Text';

const DishItem = ({ title, value, image, isInList }) => {
  console.log('aaa');
  return (
    <View style={[styles.container, isInList && styles.containerInList]}>
      <FastImage
        source={image ? { uri: image } : Images.test}
        style={[styles.image, isInList && styles.imageInList]}
      />
      <Icon name="love" style={styles.iconLove} />
      <Text style={styles.title} numberOfLines={2} type="body2SemiBold">
        {title}
      </Text>
      <View style={styles.row}>
        <Icon name="fire" size={13} color={Colors.placeholderText} />
        <Text type="semi">
          {value}
          {' '}
cal
        </Text>
      </View>
    </View>
  );
};
DishItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  isInList: PropTypes.bool,
};

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = (width - 100) / 2;
const IMAGE_WIDTH_IN_LIST = (width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    width: IMAGE_WIDTH,
  },
  containerInList: {
    width: IMAGE_WIDTH_IN_LIST,
    marginLeft: 20,
    marginTop: 20,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: 8,
    marginBottom: 10,
  },
  imageInList: {
    width: IMAGE_WIDTH_IN_LIST,
    height: IMAGE_WIDTH_IN_LIST,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingRight: 30,
  },
  iconLove: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: Colors.default,
    fontSize: 17,
  },
});

export default DishItem;
