import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Colors } from 'themes';
import { dismissLightBox } from 'navigation/navigationActions';
import { safeArea } from 'utils/Devices';

const PopupWrapper = ({
  onClose,
  contentStyle,
  children,
  center,
  componentId,
}) => {
  const [animated] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animated, {
      toValue: 1,
    }).start();
  }, [animated]);

  const closePopup = () => {
    Animated.timing(animated, {
      toValue: 0,
      duration: 100,
    }).start(() => {
      onClose && onClose();
      componentId && dismissLightBox(componentId);
    });
  };

  const backgroundColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', Colors.blur1],
  });
  const translateY = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.View
        style={[
          styles.container,
          center && styles.center,
          { transform: [{ translateY }] },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={closePopup}
          style={[styles.overlay, center && styles.overlayWithCenterContent]}
        >
          <View
            style={[styles.overlay, center && styles.overlayWithCenterContent]}
          />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.content, contentStyle]}>
          {children}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

PopupWrapper.propTypes = {
  children: PropTypes.any,
  contentStyle: PropTypes.any,
  onClose: PropTypes.func,
  center: PropTypes.bool,
};

PopupWrapper.defaultProps = {};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  overlay: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.default,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: safeArea().bottom,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 15,
  },
  center: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  overlayWithCenterContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default PopupWrapper;
