import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import Button from './Button';
import Text from './Text';
import {Colors, Fonts} from 'themes';

const SelectionButton = ({style, title, onPress, value}) => {
  return (
    <View style={[styles.input, style]}>
      <Text type="body3SemiBold">{title}</Text>
      <Button
        textStyle={styles.txtBtn}
        transparent
        style={styles.btn}
        buttonTitle={value}
        onPress={onPress}
      />
    </View>
  );
};
SelectionButton.propTypes = {
  style: PropTypes.any,
  title: PropTypes.string,
  onPress: PropTypes.func,
  value: PropTypes.string,
};

const styles = StyleSheet.create({
  input: {
    marginTop: 15,
  },
  btn: {
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    height: 40,
    justifyContent: 'flex-start',
  },
  txtBtn: {
    color: Colors.divider,
    textAlign: 'left',
    fontWeight: Fonts.fontWeight.normal,
  },
});

export default SelectionButton;
