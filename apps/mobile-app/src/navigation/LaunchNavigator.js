import {
 createStackNavigator,
} from 'react-navigation';
import SignIn from 'screens/User/SignIn';
import SignUp from 'screens/User/SignUp';
import Intro from 'screens/User/Intro';
import ForgotPassword from 'screens/User/ForgotPassword';


export default createStackNavigator({
    Intro: {
        screen: Intro,
        navigationOptions: {
            header: null,
        },
    },
    SignIn,
    SignUp,
    ForgotPassword,
}, { initialRouteName: 'Intro' });
