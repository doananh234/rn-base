import React from 'react';
import {Text} from 'react-native';
import {PersistGate} from 'redux-persist/es/integration/react';

import {Provider} from 'react-redux';
import {useScreens} from 'react-native-screens';
import configI18n from './i18n/index';
import configureStore from './redux/store';
import './themes/Images';
import AppNavigation from './navigation/AppNavigation';
import {setNavigator} from './navigation/NavigatorService';

// TODO: Enable screens support before any of your navigation screen renders
useScreens();

const {persistor, store} = configureStore(stored => {
  configI18n(stored);
});

const Loading = () => <Text>Loading</Text>;

export default function Setup() {
  const onBeforeLift = () => {
    // take some action before the gate lifts
  };

  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        onBeforeLift={onBeforeLift}
        persistor={persistor}>
        <AppNavigation
          ref={nav => {
            // TODO: Setup navigator to use react-navigation in saga
            // eslint-disable-next-line max-len
            // Notice: useRef & setNavigator in useEffect not work with PersistGate
            setNavigator(nav);
          }}
        />
      </PersistGate>
    </Provider>
  );
}
