import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';

const SCREEN_OVERLAY = {
  android: 'overCurrentContext',
  ios: 'overFullScreen',
};
let progressId = null;
let isShowing = null;

export const showProgress = (isShow = true) => {
  if (isShow && !isShowing && !progressId) {
    isShowing = true;
    setTimeout(() => {
      Navigation.showModal({
        component: {
          name: 'ProgressScreen',
          passProps: {
            onDisplay: componentId => {
              progressId = componentId;
            },
          },
          options: {
            overlay: {
              interceptTouchOutside: false,
            },
            layout: {
              componentBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
            },
            screenBackgroundColor: 'transparent',
            modalPresentationStyle: SCREEN_OVERLAY[Platform.OS],
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
        },
      });
    });
  } else if (!isShow) {
    progressId
      && Navigation.dismissModal(progressId, {
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
    isShowing = false;
    progressId = null;
  }
};
