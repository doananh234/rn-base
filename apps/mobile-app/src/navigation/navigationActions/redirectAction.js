import { Navigation } from 'react-native-navigation';
import { Colors } from 'themes';
import { startStackScreen } from './stack';
import { push } from './push';
import { more } from '../navigationButtons';

export const showComingSoonPopup = () => {
  Navigation.showOverlay({
    component: {
      // For coming soon
      id: 'app.ComingSoonPopup',
      name: 'app.ComingSoonPopup',
      passProps: {
        onClose: () => {
          Navigation.dismissOverlay('app.ComingSoonPopup');
        },
      },
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

export const openTourDetail = (componentId, item) => {
  push(
    componentId,
    'TourDetail',
    {
      passProps: {
        item,
      },
      topBar: {
        background: {
          color: 'transparent',
        },
      },
      rightButtons: [more()],
    },
    true,
  );
};
