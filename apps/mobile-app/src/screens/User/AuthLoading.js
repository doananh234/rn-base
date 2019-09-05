import React from 'react';
import PropTypes from 'prop-types';
import {
 ActivityIndicator, StatusBar, View,
} from 'react-native';

export default function AuthLoading({ navigation }) {
  // TODO: Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { token } = global;
    alert('AuthLoading');
    // TODO: This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(token ? 'HomeTab' : 'Intro');
  };

  _bootstrapAsync();

  // Render any loading content that you like here
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

AuthLoading.propTypes = {
  navigation: PropTypes.object,
};
