import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text as RNText} from 'react-native';
import {Fonts, Colors} from '../themes';

const Text = props => {
  const {type, color, center, underLine, style, children} = props;
  return (
    <RNText
      {...props}
      style={[
        styles.normal,
        styles[type],
        color && {color},
        center && styles.center,
        underLine && styles.txtUnderline,
        style,
      ]}>
      {children}
    </RNText>
  );
};

/* eslint-disable react-native/no-unused-styles */
export const styles = StyleSheet.create({
  // TODO: Title
  largeTitleBold: {
    // 34
    fontFamily: Fonts.type.bold,
    fontSize: 34,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  largeTitle: {
    // 34
    fontFamily: Fonts.type.semiBold,
    fontSize: 34,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  titleBold: {
    // 28
    fontFamily: Fonts.type.regular,
    fontSize: 28,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  titleSemiBold: {
    // 28
    fontFamily: Fonts.type.semiBoldDisplay,
    fontSize: 28,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  title1Bold: {
    // 26
    fontFamily: Fonts.type.regular,
    fontSize: 26,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  title1: {
    // 26
    fontFamily: Fonts.type.regular,
    fontSize: 26,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryText,
  },
  title2Bold: {
    // 23
    fontFamily: Fonts.type.regular,
    fontSize: 23,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  title2: {
    // 23
    fontFamily: Fonts.type.semiBoldDisplay,
    fontSize: 23,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  headline: {
    // semi bold 19
    fontFamily: Fonts.type.semiBold,
    fontSize: 19,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  // TODO: Body
  body1SemiBold: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 17,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  body1: {
    // 18
    fontFamily: Fonts.type.regular,
    fontSize: 17,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryTextBlur,
  },
  body1Medium: {
    // 18
    fontFamily: Fonts.type.regular,
    fontSize: 17,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.primaryTextBlur,
  },
  body2: {
    // 16
    fontFamily: Fonts.type.regular,
    fontSize: 15,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryTextBlur,
  },
  body2Bold: {
    // 16
    fontFamily: Fonts.type.bold,
    fontSize: 15,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryTextBlur,
  },
  body2SemiBold: {
    // 16
    fontFamily: Fonts.type.semiBold,
    fontSize: 15,
    fontWeight: Fonts.fontWeight.semiBold,
    color: Colors.primaryText,
  },
  body3: {
    // 14
    fontFamily: Fonts.type.regular,
    fontSize: 14,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryTextBlur,
  },
  body3SemiBold: {
    // 14
    fontFamily: Fonts.type.semiBold,
    fontSize: 14,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primaryText,
  },
  body3Bold: {
    // 14
    fontFamily: Fonts.type.regular,
    fontSize: 14,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryTextBlur,
  },
  semi: {
    // 14
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    fontWeight: Fonts.fontWeight.regular,
    color: Colors.secondaryText,
  },
  small: {
    // 12
    fontFamily: Fonts.type.light,
    fontSize: 12,
    fontWeight: Fonts.fontWeight.light,
    color: Colors.primaryTextBlur,
  },
  smallNormal: {
    // 12 nomal
    fontFamily: Fonts.type.normal,
    fontSize: 12,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryTextBlur,
  },
  tiny: {
    // 10
    fontFamily: Fonts.type.regular,
    fontSize: 10,
    fontWeight: Fonts.fontWeight.normal,
    color: Colors.primaryTextBlur,
  },
  // TODO: Button
  button: {
    // 14 bold
    fontFamily: Fonts.type.regular,
    fontSize: 17,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.default,
    // fontFamily: Fonts.type.regular,
    // fontWeight: Fonts.fontWeight.bold,
    // fontSize: Fonts.size.semi,
  },
  navButton: {
    // 10 600
    fontFamily: Fonts.type.semiBold,
    fontSize: 10,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.primary,
  },
  // TODO: Text Style
  center: {
    textAlign: 'center',
  },
  txtUnderline: {
    textDecorationLine: 'underline',
  },
});

Text.propTypes = {
  type: PropTypes.oneOf(Object.keys(styles)),
  color: PropTypes.string,
  center: PropTypes.bool,
  underLine: PropTypes.bool,
  style: PropTypes.any,
  children: PropTypes.any,
};

Text.defaultProps = {
  type: 'body2',
};

export default Text;
