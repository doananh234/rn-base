import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

// Common screen
import InAppNotification from '../screens/Popup/Notification';
import WebView from '../components/Popup/WebView';
import ProgressScreen from '../components/ProgressScreen';
import ComingSoonPopup from '../screens/Popup/ComingSoonPopup';
import Picker from '../screens/Popup/Picker';
import DatePicker from '../screens/Popup/DatePicker';
// Intro
import Intro from '../screens/User/Intro';
import IntroWithSlide from '../screens/User/IntroWithSlide';
import SignIn from '../screens/User/SignIn';
import Signup from '../screens/User/Signup';
import ForgotPassword from '../screens/User/ForgotPassword';
import ResetPassword from '../screens/User/ResetPassword';
import VerifyPassword from '../screens/User/VerifyPassword';
// tabbar
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import Calendar from '../screens/Calendar';

// Home

import Notifications from '../screens/Notifications';
import About from '../screens/Setting/About';
import Contact from '../screens/Setting/Contact';
import Purchase from '../screens/Purchase';

const SCREENS_WITH_REDUX = {
  Intro,
  IntroWithSlide,
  Signup,
  ForgotPassword,
  VerifyPassword,
  ResetPassword,
  SignIn,
  // tabs
  Home,
  Calendar,
  Setting,
  // home
  Notifications,
  Purchase,
};
const SCREENS = {
  ProgressScreen,
  InAppNotification,
  WebView,
  ComingSoonPopup,
  Picker,
  DatePicker,
  About,
  Contact,
};

export function registerScreens(store, persistor) {
  const PersistProvider = props => {
    const { children } = props;
    return (
      <Provider {...props}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        {children}
        {/* </PersistGate> */}
      </Provider>
    );
  };

  Object.keys(SCREENS_WITH_REDUX).map(screenName => {
    Navigation.registerComponentWithRedux(
      screenName,
      () => SCREENS_WITH_REDUX[screenName],
      PersistProvider,
      store
    );
  });

  Object.keys(SCREENS).map(screenName => {
    Navigation.registerComponent(screenName, () => SCREENS[screenName]);
  });
}
