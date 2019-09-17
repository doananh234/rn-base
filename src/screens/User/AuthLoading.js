import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';

function AuthLoading({ navigation }) {
  const isLogged = useSelector(state => state.login.isLogged);

  // TODO: Fetch the token from storage then navigate to our appropriate place
  useEffect(() => {
    navigation.navigate(isLogged ? 'BottomTabNavigator' : 'LaunchNavigator');
  }, [isLogged]);


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

export default withNavigation(AuthLoading);
