import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import { Colors } from 'themes';
import { close } from '../navigationButtons';

const SCREEN_OVERLAY = {
  android: 'overCurrentContext',
  ios: 'overFullScreen',
};

export const showModal = async (
  screen,
  config = {},
  navHidden = false,
  showStack = true,
) => {
  const component = {
    // id: screen,
    name: screen,
    passProps: config.passProps,
    options: {
      // overlay: {
      //   interceptTouchOutside: true
      // },
      topBar: {
        visible: !navHidden,
        drawBehind: navHidden,
        elevation: 1,
        leftButtons: config.leftButtons || [close()],
        rightButtons: config.rightButtons,
        background: {
          color: Colors.backgroundNav,
        },
        title: {
          text: config.title,
          color: Colors.titleNav,
        },
        // largeTitle: {
        //   visible: config.largeTitle !== false,
        //   ...TextStyle.largeTitle
        // },
        noBorder: false,
        ...config?.topBar,
      },
      layout: {
        componentBackgroundColor: showStack ? Colors.default : 'transparent',
        backgroundColor: showStack ? Colors.default : 'transparent',
      },
      modalPresentationStyle: showStack
        ? undefined
        : SCREEN_OVERLAY[Platform.OS],
      animations: config.animations,
    },
  };
  await Navigation.showModal(
    showStack
      ? {
          stack: {
            children: [{ component }],
          },
        }
      : { component },
  );
};

export const showLightBox = (screen, config = {}) => {
  showModal(
    screen,
    {
      ...config,
      animations: {
        showModal: {
          enabled: false,
        },
        dismissModal: {
          enable: false,
          enabled: false,
        },
      },
    },
    false,
    false,
  );
};

export const dismissModal = componentId => {
  Navigation.dismissModal(componentId);
};

export const dismissLightBox = async componentId => {
  await Navigation.dismissModal(componentId, {
    animations: {
      showModal: {
        enabled: false,
      },
      dismissModal: {
        enable: false,
        enabled: false,
      },
    },
  });
};

export const dismissAllModals = () => {
  Navigation.dismissAllModals();
};
