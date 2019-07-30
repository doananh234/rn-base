import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/mealplanner';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '../Text';
import { Colors } from '../../themes';

const PurchaseServiceItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Icon
        name="check"
        style={{ marginRight: 15 }}
        color={Colors.primary}
        size={17}
      />
      <Text type="body2" color={Colors.primaryText} style={{ flex: 1 }}>
        {item}
      </Text>
    </View>
  );
};
PurchaseServiceItem.propTypes = {
  item: PropTypes.string,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 23,
    width: width - 100,
    marginLeft: 50,
  },
});

export default PurchaseServiceItem;
