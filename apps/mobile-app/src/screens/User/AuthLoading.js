import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';

function AuthLoading({ navigation }) {
  const { isLogged, isSkipLogin } = useSelector(state => state.auth);

  // TODO: Fetch the token from storage then navigate to our appropriate place
  useEffect(() => {
    navigation.navigate(
      isLogged || isSkipLogin ? 'BottomTabNavigator' : 'LaunchNavigator',
    );
  }, [isLogged, isSkipLogin, navigation]);

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

export default AuthLoading;
