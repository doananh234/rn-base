import { Navigation } from 'react-native-navigation';
import { registerScreens } from 'navigation/screens';
import { iconsLoaded } from 'utils/appIcons';
import { onNavigatorEvent } from 'navigation/navigationActions/handleNavButtonOnPress';
import configureStore from '@redux/store';
import 'themes/Images';
import 'utils/Devices';
import { startup } from '@redux/AppRedux/slice';
import configI18n from './i18n/index';

const App = () => {
  const loadStore = async () => {
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
        const { token } = store.getState().auth;
        global.token = token;
        store.dispatch(startup());
      })
      .catch(err => {
        console.log(err);
      });
  };

  Navigation.events().registerAppLaunchedListener(async () => {
    try {
      await loadIntial();
    } catch (error) {
      //
    }
  });

  Navigation.events().registerNavigationButtonPressedListener(
    ({ buttonId, componentId }) => {
      onNavigatorEvent(buttonId, componentId);
    },
  );
};

export default App;
