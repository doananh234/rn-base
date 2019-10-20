import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../themes';

const Chip = ({text, style, onPress = () => {}, color = Colors.default}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.vChipcard,
        {backgroundColor: color},
        !color || (color === Colors.default && styles.defaultBorder),
        style,
      ]}>
      <Text
        style={[
          styles.txtChipcard,
          !color || (color === Colors.default && {color: Colors.primaryText}),
        ]}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = {
  vChipcard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    minWidth: 30,
    borderRadius: 15,
    paddingHorizontal: 7.8,
    marginRight: 2,
    marginBottom: 5,
  },
  txtChipcard: {
    color: Colors.default,
  },
  defaultBorder: {
    borderColor: Colors.divider,
    borderWidth: 1,
  },
};

Chip.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  color: PropTypes.string,
  style: PropTypes.any,
};

export default Chip;
