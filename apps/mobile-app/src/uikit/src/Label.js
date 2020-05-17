import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/mealplanner';
import Text from './Text';

const Label = ({ icon, iconColor, text }) => {
  return (
    <View style={styles.desc}>
      <Icon style={styles.icon} name={icon} color={iconColor} />
      {text && <Text type="body2">{` ${text}`}</Text>}
    </View>
  );
};

Label.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  desc: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
});

export default Label;
