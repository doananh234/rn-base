import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollViewUI = ({
  children,
  center,
  contentContainerStyle,
  style,
}) => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={[
        center && styles.center,
        styles.content,
        contentContainerStyle,
      ]}
      style={style}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.flex}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

KeyboardAwareScrollViewUI.propTypes = {
  children: PropTypes.any,
  center: PropTypes.bool,
  contentContainerStyle: PropTypes.any,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingBottom: 60,
  },
  flex: {
    flex: 1,
  },
});

export default KeyboardAwareScrollViewUI;
