import React, { useEffect, useState } from 'react';
import { StyleSheet, Keyboard, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { safeArea } from 'utils/Devices';

const FooterWrapper = ({ children, hasTabBar }) => {
  const [animated] = useState(new Animated.Value(0));
  useEffect(() => {
    const tabBarHeight = 50 + (safeArea().statusBar > 30 ? 34 : 0);
    const keyboardDidShow = e => {
      Animated.spring(animated, {
        toValue: -e.endCoordinates.height + (hasTabBar ? tabBarHeight : 0),
      }).start();
    };

    const keyboardDidHide = () => {
      Animated.spring(animated, {
        toValue: 0,
      }).start();
    };

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardDidHide,
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [animated, hasTabBar]);
  return (
    <Animated.View
      style={[styles.footer, { transform: [{ translateY: animated }] }]}
    >
      {children}
    </Animated.View>
  );
};

FooterWrapper.propTypes = {
  children: PropTypes.any,
  hasTabBar: PropTypes.bool,
};

const styles = StyleSheet.create({
  footer: {},
});

export default FooterWrapper;
