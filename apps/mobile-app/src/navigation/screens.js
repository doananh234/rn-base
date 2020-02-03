import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

// Common screen
import Intro from 'screens/User/Intro';
import SignIn from 'screens/User/SignIn';
import SignUp from 'screens/User/SignUp';
import ForgotPassword from 'screens/User/ForgotPassword';
import Home from 'screens/Home';
import Setting from 'screens/Setting';
import Calendar from 'screens/Calendar';
import Detail from 'screens/Home/Detail';
import Purchase from 'screens/Purchase';

// Popup
import withLocale from '../i18n/withLocale';

// tabbar

// Home

const SCREENS_WITH_REDUX = {
  Purchase,
  Detail,
  Calendar,
  Setting,
  Home,
  Intro,
  SignIn,
  SignUp,
  ForgotPassword,
  // home
};

const SCREENS = {};

export function registerScreens(store) {
  Object.keys(SCREENS_WITH_REDUX).map(screenName =>
    Navigation.registerComponentWithRedux(
      screenName,
      () => gestureHandlerRootHOC(withLocale()(SCREENS_WITH_REDUX[screenName])),
      Provider,
      store,
    ),
  );

  Object.keys(SCREENS).map(screenName => {
    Navigation.registerComponent(screenName, () =>
      gestureHandlerRootHOC(SCREENS[screenName]),
    );
  });
}
