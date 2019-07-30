import { Navigation } from 'react-native-navigation';
import { startStackScreen } from './stack';
import { push } from './push';
import { Colors } from '../../themes';

export const showComingSoonPopup = () => {
  Navigation.showOverlay({
    component: {
      // For coming soon
      id: 'app.ComingSoonPopup',
      name: 'app.ComingSoonPopup', // unique ID registered with Navigation.registerScreen
      passProps: {
        onClose: () => {
          Navigation.dismissOverlay('app.ComingSoonPopup');
        },
      }, // simple serializable object that will pass as props to the lightbox (optional)
      style: {
        backgroundBlur: 'none',
        backgroundColor: Colors.blur1,
        tapBackgroundToDismiss: true,
      },
      options: {
        overlay: {
          interceptTouchOutside: true,
        },
      },
    },
  });
};

export const goIntro = () => {
  startStackScreen();
};

export const resetTo = (screen, config = {}, visibleNav = false) => {
  startStackScreen(screen, config, visibleNav);
};

export const goProgressUpdate = () => {
  startStackScreen('app.ProgressUpdateScreen', {}, false);
};

export const openWebInApp = (componentId, title, uri) => {
  push(componentId, 'app.WebView', {
    title,
    passProps: {
      uri,
    },
  });
};
