import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import I18n from 'i18n-js';
import { Colors } from 'themes/index';
import { menu, bookmark } from '../navigationButtons';
import { navigatorStyle } from '../navigatonStyle';

export const startWithSideMenu = () => {
  const SIDE_MENU_COMPONENT = 'SettingTab';

  const stack = {
    options: {
      topBar: {
        visible: true,
      },
    },
    children: [
      {
        component: {
          id: 'HomeTab',
          name: 'HomeTab',
          options: _.merge(navigatorStyle, {
            topBar: {
              leftButtons: [menu()],
              rightButtons: [bookmark()],
              title: {
                text: I18n.translate('appName'),
                color: Colors.default,
              },
            },
            // backButton: {
            //   icon: iconsMap.back,
            //   visible: true,
            // },
          }),
        },
      },
    ],
  };

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'sideMenu',
            name: SIDE_MENU_COMPONENT,
          },
        },
        center: {
          stack,
        },
      },
    },
  });
};

export const toggleSideMenu = (isVisible = true, componentId) => {
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      left: {
        visible: isVisible,
        enabled: true,
      },
    },
  });
};

export default { startWithSideMenu };
