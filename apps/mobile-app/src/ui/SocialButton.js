import React from 'react';
import {
 StyleSheet, View,
} from 'react-native';
import MealPlanner from 'react-native-vector-icons/mealplanner';
import Button from './Button';
import {
 Colors,
} from '../themes';
import Touchable from './Touchable';

export const GoogleButton = ({ onPress }) => {
  return (
    <Touchable onPress={onPress}>
      <View style={[styles.container, styles.google]}>
        <MealPlanner name="google" size={24} color={Colors.default} />
      </View>
    </Touchable>
  );
};

export const FacebookButton = ({ onPress }) => {
  return (
    <Touchable onPress={onPress}>
      <View style={[styles.container, styles.facebook]}>
        <MealPlanner name="facebook" size={24} color={Colors.default} />
      </View>
    </Touchable>
  );
};

GoogleButton.propTypes = {};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 60,
    width: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  google: {
    backgroundColor: Colors.google,
  },
  facebook: {
    backgroundColor: Colors.facebook,
  },
  icon: {
    color: Colors.default,
    marginRight: 0,
  },
});
