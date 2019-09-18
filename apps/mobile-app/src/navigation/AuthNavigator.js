import {
 createStackNavigator,
} from 'react-navigation';
import SignIn from 'screens/User/SignIn';
import Intro from 'screens/User/Intro';
import ForgotPassword from 'screens/User/ForgotPassword';

export default createStackNavigator(
  { SignIn, Intro, ForgotPassword },
  { headerMode: 'none' }
);
