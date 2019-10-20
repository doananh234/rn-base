import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/mealplanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View} from 'react-native';
import Touchable from './Touchable';
import Text from './Text';
import Colors from '../themes/Colors';

const Button = ({
  center,
  primary,
  secondary,
  transparent,
  style,
  disabled,
  icon,
  ionicons,
  iconColor,
  iconSize,
  iconStyle,
  fontAwesome,
  textStyle,
  buttonTitle,
  subTitle,
  loading,
  onPress,
  isShadow,
  wrapperStyle,
}) => {
  const innerView = (
    <View
      style={[
        styles.buttonWithText,
        center && styles.center,
        primary && {backgroundColor: Colors.primary},
        secondary && {backgroundColor: Colors.secondary},
        transparent && {backgroundColor: Colors.transparent},
        isShadow && styles.shadow,
        style,
        disabled && styles.disabledBtt,
      ]}>
      {icon ? (
        <Icon
          name={icon}
          color={iconColor || Colors.default}
          size={iconSize || 20}
          style={[styles.iconLeft, iconStyle]}
        />
      ) : null}
      {ionicons ? (
        <Ionicons
          name={ionicons}
          color={iconColor || Colors.default}
          size={iconSize || 20}
          style={[styles.iconLeft, iconStyle]}
        />
      ) : null}
      {fontAwesome ? (
        <FontAwesome
          name={fontAwesome}
          color={iconColor || Colors.default}
          size={iconSize || 20}
          style={[styles.iconLeft, iconStyle]}
        />
      ) : null}
      <Text
        type="button"
        style={[
          styles.buttonText,
          (secondary || primary) && !transparent && {color: Colors.default},
          textStyle,
          disabled && {color: `${Colors.default}60`},
        ]}>
        {buttonTitle}
        {subTitle && (
          <Text
            type="body1"
            style={[
              styles.buttonText,
              (secondary || primary) && !transparent && {color: Colors.default},
              textStyle,
              disabled && {color: `${Colors.default}60`},
            ]}>
            {`\n${subTitle}`}
          </Text>
        )}
      </Text>
    </View>
  );
  if (loading || disabled) {
    return innerView;
  }
  return (
    <Touchable
      style={[isShadow && styles.shadow, wrapperStyle]}
      onPress={onPress}>
      {innerView}
    </Touchable>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  transparent: PropTypes.bool,
  center: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.any,
  icon: PropTypes.string,
  ionicons: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  iconStyle: PropTypes.any,
  fontAwesome: PropTypes.string,
  textStyle: PropTypes.any,
  isShadow: PropTypes.bool,
  wrapperStyle: PropTypes.any,
  subTitle: PropTypes.string,
};

Button.defaultProps = {
  center: true,
};

export default Button;

const styles = StyleSheet.create({
  buttonWithText: {
    marginTop: 0,
    height: 60,
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.blur,
  },
  center: {
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.primaryText,
  },
  disabledBtt: {
    backgroundColor: Colors.blur,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
  },
  iconLeft: {marginRight: 10},
});
