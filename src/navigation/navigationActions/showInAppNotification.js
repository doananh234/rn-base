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
  inAppComponentId && dismissInAppNoti();
  Navigation.showOverlay({
    component: {
      name: 'app.UploadReviewProgress',
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

export const dismissInAppNoti = () => {
  inAppComponentId && dismissOverlay(inAppComponentId);
  inAppComponentId = null;
};
