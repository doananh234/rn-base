import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/mealplanner';
import Text from '../Text';
import { Images, Colors } from '../../themes';
import SwipeableRow from './SwipeableRow';
import Button from '../Button';

const HomeItem = ({ item, isFavoriteScreen }) => {
  const { image, title, value } = item;
  const content = (
    <View style={styles.container}>
      <FastImage source={image ? { uri: image } : Images.test} style={styles.image} />
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1} type="body2SemiBold">
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
      {isFavoriteScreen && <Icon name="love-fill" style={styles.iconLove} />}
    </View>
  );
  const rightButtons = [
    <Button
      iconStyle={[styles.icon, { color: Colors.primaryText }]}
      style={styles.btnEdit}
      icon="edit"
    />,
    <Button iconStyle={styles.icon} secondary style={styles.btnRemove} icon="remove" />,
  ];
  return isFavoriteScreen ? (
    content
  ) : (
    <SwipeableRow
      rightButtonWidth={60}
      rightButtonContainerStyle={styles.hiddenView}
      rightButtons={rightButtons}
    >
      {content}
    </SwipeableRow>
  );
};
HomeItem.propTypes = {
  item: PropTypes.object,
  isFavoriteScreen: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
  },
  center: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    marginBottom: 5,
  },
  iconLove: {
    fontSize: 20,
    color: Colors.primary,
  },
  btnEdit: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.lightDivider,
  },
  btnRemove: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  icon: {
    marginRight: 0,
    fontSize: 17,
  },
  hiddenView: {
    justifyContent: 'center',
  },
});

export default HomeItem;
