import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AuthLoading from 'screens/User/AuthLoading';
import LaunchNavigator from './LaunchNavigator';
import BottomTabNavigator from './BottomTabNavigator';

// TODO: Switch Navigator
const SwitchNav = createSwitchNavigator(
  {
    AuthLoading,
    BottomTabNavigator,
    LaunchNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(SwitchNav);
