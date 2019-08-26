import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import configI18n from './i18n/index';
import { iconsLoaded } from './utils/appIcons';
import configureStore from './redux/store';
import './themes/Images';
import AppNavigation from './navigation/AppNavigation';
// import AppNavigation from './navigation/AppNavigation';


// const loadStore = async () => {
//   return new Promise(resolve => {
//     configureStore(store => {
//       configI18n(store);
//       resolve(store);
//     });
//   });
// };


export default function Setup() {
  useEffect(() => {
    async function sideEffect() {
      await iconsLoaded;
    }
    sideEffect();
  }, []);

  const configuredStore = configureStore(store => {
    configI18n(store);
  });


  return (
    <Provider store={configuredStore}>
      <AppNavigation />
    </Provider>
  );
}
