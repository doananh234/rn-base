import { Navigation } from 'react-native-navigation';
import { dismissOverlay } from './showOverlay';

let inAppComponentId = null;

export const showInAppNoti = (
  passProps = { title: '', content: '', type: '' },
  screen = 'InAppNotification',
) => {
  inAppComponentId && dismissInAppNoti();
  Navigation.showOverlay({
    component: {
      name: screen,
      passProps: {
        ...passProps,
        onDisplay: id => {
          inAppComponentId = id;
        },
      },
      options: {
        overlay: {
          interceptTouchOutside: false,
        },
      },
    },
  });
};

export const showInAppProgress = passProps => {
  Navigation.showOverlay({
    component: {
      name: 'UploadProgress',
      id: 'UploadProgress',
      passProps: {
        ...passProps,
      },
      options: {
        overlay: {
          interceptTouchOutside: true,
        },
      },
    },
  });
};

export const dismissInAppNoti = () => {
  inAppComponentId && dismissOverlay(inAppComponentId);
  inAppComponentId = null;
};
