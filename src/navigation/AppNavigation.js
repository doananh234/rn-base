import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LaunchNavigator from './LaunchNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import AuthLoading from '../screens/User/AuthLoading';


// TODO: Switch Navigator
const SwitchNav = createSwitchNavigator(
  {
    AuthLoading,
    BottomTabNavigator,
    LaunchNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(SwitchNav);
