import { Navigation } from 'react-native-navigation';

export const showOverlay = (screen, config) => {
  const component = {
    // id: screen,
    name: screen,
    passProps: config.passProps,
    options: {
      // overlay: {
      //   interceptTouchOutside: true,
      // },
    },
  };
  Navigation.showOverlay({
    component,
  });
};

export const dismissOverlay = componentId => {
  Navigation.dismissOverlay(componentId);
};
