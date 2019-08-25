import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import AuthLoading from '../screens/User/AuthLoading';


// TODO: Switch Navigator
const SwitchNav = createSwitchNavigator(
  {
    AuthLoading,
    BottomTabNavigator,
    AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(SwitchNav);
