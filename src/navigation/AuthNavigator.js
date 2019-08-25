import { createStackNavigator } from 'react-navigation';
import SignIn from '../screens/User/SignIn';
import ForgotPassword from '../screens/User/ForgotPassword';


export default createStackNavigator({ SignIn, ForgotPassword }, { headerMode: 'none', mode: 'modal' });
