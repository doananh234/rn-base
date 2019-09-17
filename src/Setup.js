import React, { useEffect, useRef } from 'react';

import { Provider } from 'react-redux';
import configI18n from './i18n/index';
import { iconsLoaded, iconsMap } from './utils/appIcons';
import configureStore from './redux/store';
import './themes/Images';
import AppNavigation from './navigation/AppNavigation';
import { setNavigator } from './navigation/NavigatorService';


export default function Setup() {
  const navigatorRef = useRef();

  useEffect(() => {
    async function sideEffect() {
      await iconsLoaded;
    }
    sideEffect();
  }, []);

  // TODO: Setup navigator to use react-navigation in saga
  useEffect(() => {
    setNavigator(navigatorRef.current);
  }, [])

  const configuredStore = configureStore(store => {
    configI18n(store);
  });


  return (
    <Provider store={configuredStore}>
      <AppNavigation ref={navigatorRef} />
    </Provider>
  );
}
