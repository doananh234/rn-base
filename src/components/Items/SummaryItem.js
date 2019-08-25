import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/mealplanner';
import { View, StyleSheet } from 'react-native';
import Text from '../../ui/Text';
import { Colors } from '../../themes';

const SummaryItem = ({
 title, value, style, backgroundColor = Colors.primary, icon,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {icon && <Icon style={styles.icon} name={icon} />}
      <Text type="title1Bold" color={Colors.default}>
        {value || 0}
      </Text>
      {title && (
        <Text type="smallNormal" color={Colors.default}>
          {title}
        </Text>
      )}
    </View>
  );
};
SummaryItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any,
  backgroundColor: PropTypes.string,
  style: PropTypes.any,
  icon: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  icon: {
    color: Colors.default,
    fontSize: 40,
  },
});

export default SummaryItem;
