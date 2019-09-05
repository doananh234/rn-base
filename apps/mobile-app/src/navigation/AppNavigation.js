import {
 createSwitchNavigator, createAppContainer,
} from 'react-navigation';
import AuthLoading from '@screens/User/AuthLoading';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';

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
