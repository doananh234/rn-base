import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import IcoMoon from 'react-native-vector-icons/tahiti';
import { Colors } from 'themes';
import IonIcon from 'react-native-vector-icons/Ionicons';

const ButtonSquare = ({
  ionicon,
  icomoon,
  size = 17,
  btnStyle,
  style,
  onPress,
}) => {
  return (
    <View style={[styles.default, btnStyle]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.vIndicator,
            styles.center,
            { backgroundColor: Colors.whiteSmoke },
          ]}
        >
          {icomoon && <IcoMoon name={icomoon} size={size} />}
          {ionicon && <IonIcon name={ionicon} size={size} />}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.blur,
  },
  default: {
    width: 55,
    height: 55,
    // marginRight: 21,
    // marginBottom: 21,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default ButtonSquare;
