import { Navigation } from 'react-native-navigation';
import configI18n from './i18n/index';
import { registerScreens } from './navigation/screens';
import { onNavigatorEvent } from './navigation/navigationActions/handleNavButtonOnPress';
import { iconsLoaded } from './utils/appIcons';
import configureStore from './redux/store';
import Actions from './redux/AppRedux/actions';
import './themes/Images';

const App = () => {
  const loadStore = async() => {
    return new Promise(resolve => {
      configureStore((store, persistor) => {
        configI18n(store);
        registerScreens(store, persistor);
        resolve(store, persistor);
      });
    });
  };
  const loadIntial = () => {
    return Promise.all([loadStore(), iconsLoaded])
      .then(response => {
        const store = response[0];
        const { token } = store.getState().login;
        global.token = token;
        console.log('store', store);
        store.dispatch(Actions.startup());
      })
      .catch(err => {
        console.log(err);
      });
  };

  Navigation.events().registerAppLaunchedListener(async() => {
    try {
      await loadIntial();
    } catch (error) {
      console.log('error', error);
      //
    }
  });

  Navigation.events().registerNavigationButtonPressedListener(({ buttonId, componentId }) => {
    onNavigatorEvent(buttonId, componentId);
  });
};

export default App;
