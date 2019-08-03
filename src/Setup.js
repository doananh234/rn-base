import { Navigation } from 'react-native-navigation';
import configI18n from './i18n/index';
import { registerScreens } from './navigation/screens';
import { onNavigatorEvent } from './navigation/navigationActions/handleNavButtonOnPress';
import { iconsLoaded } from './utils/appIcons';
import configureStore from './redux/store';
import './themes/Images';

const App = () => {
  const loadStore = async() => {
    return new Promise(resolve => {
      configureStore(store => {
        configI18n(store);
        registerScreens(store);
        resolve(store);
      });
    });
  };
  const loadIntial = async() => {
    try {
    await iconsLoaded;
    await loadStore();
    } catch (error) {
      //
    }
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
