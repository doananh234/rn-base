import { Navigation } from 'react-native-navigation';
import { Colors, Fonts } from 'themes/index';
import { navigatorStyle } from '../navigatonStyle';
import { back, menu } from '../navigationButtons';

export function startStackScreen(
  screen = 'Intro',
  title = '',
  isHaveNav = false,
) {
  Navigation.setRoot({
    root: {
      stack: {
        options: navigatorStyle,
        children: [
          {
            component: {
              name: screen,
              options: {
                topBar: {
                  ...navigatorStyle.topBar,
                  visible: isHaveNav,
                  // drawBehind: !isHaveNav,
                  title: {
                    text: title,
                    fontSize: 17,
                    color: Colors.titleNav,
                    alignment: 'center',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
}

// export function startStackScreen() {
//   const ROOT_SCREEN = 'ForgotPassword';
//   // const ROOT_TITLE = 'Home';
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: ROOT_SCREEN,
//             },
//           },
//         ],
//       },
//     },
//   });
// }

export function setStackRoot(
  componentId,
  screen,
  config = {},
  navHidden = false,
  tabHidden = true,
) {
  Navigation.setStackRoot(componentId, [
    {
      component: {
        id: screen,
        name: screen,
        passProps: config.passProps,
        options: {
          popGesture: true,
          topBar: {
            visible: !navHidden,
            drawBehind: false,
            animate: true,
            elevation: 0,
            noBorder: true,
            buttonColor: Colors.iconNav,
            background: {
              color: Colors.backgroundNav,
            },
            title: {
              text: config.title,
              color: Colors.titleNav,
              fontFamily: Fonts.type.semiBold,
            },
            // largeTitle: {
            //   visible: config.largeTitle !== false,
            //   ...TextStyle.largeTitle,
            // },
            backButtonTitle: config.backButtonTitle,
            backButton: back(),
            leftButtons: menu(),
            rightButtons: config.rightButtons,
            ...config?.topBar,
          },
          bottomTabs: {
            visible: !tabHidden,
            drawBehind: tabHidden,
            backgroundColor: Colors.tabBackground,
          },
          animations: {
            setStackRoot: {
              enabled: true,
            },
          },
        },
      },
    },
  ]);
}
export const initHandleScreen = (componentId, componentName) => {
  if (componentId === 'sideMenu') return;
  global.currentScreenName = componentName;
  global.currentScreenId = componentId;
};
