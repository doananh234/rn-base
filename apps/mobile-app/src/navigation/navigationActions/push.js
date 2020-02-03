import { Navigation } from 'react-native-navigation';
// import { back } from '../navigationButtons';
import { Colors, Fonts } from 'themes';
import { back } from '../navigationButtons';
import { animations } from '../navigatonStyle';
// import { styles as TextStyle } from '../../components/Text';

// navigator, config, navigatorButtons, navHidden
export const push = (
  componentId,
  screen,
  config = {},
  navHidden = false,
  tabHidden = true,
) => {
  Navigation.push(componentId, {
    component: {
      name: screen,
      passProps: config.passProps,
      options: {
        popGesture: true,
        topBar: {
          visible: !navHidden,
          drawBehind: false,
          animate: false,
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
            fontSize: 29,
          },
          // largeTitle: {
          //   visible: config.largeTitle !== false,
          //   ...TextStyle.largeTitle,
          // },
          backButtonTitle: config.backButtonTitle || ' ',
          leftButtons: config.leftButtons,
          rightButtons: config.rightButtons,
          ...config?.topBar,
        },
        bottomTabs: {
          visible: !tabHidden,
          drawBehind: tabHidden,
          backgroundColor: Colors.tabBackground,
        },
        animations,
      },
    },
  });
};

// share element
// export const pushShareElement = (componentId, screen, config, elements) => {
//   Navigation.push(componentId, {
//     component: {
//       name: screen,
//       id: config.id,
//       passProps: config.passProps,
//       options: {
//         popGesture: true,
//         topBar: {
//           visible: true,
//           drawBehind: true,
//           animate: true,
//           elevation: 0,
//           noBorder: true,
//           buttonColor: Colors.titleNav,
//           background: {
//             color: 'transparent',
//           },
//           title: {
//             text: config.title,
//             color: Colors.primaryText,
//           },
//           backButtonTitle: config.backButtonTitle,
//           backButton: back(false, Colors.default),
//           leftButtons: config.leftButtons,
//           rightButtons: config.rightButtons,
//         },
//         bottomTabs: {
//           visible: false,
//           drawBehind: true,
//         },
//         // animations: {
//         //   push: {
//         //     waitForRender: true,
//         //     content: {
//         //       x: {
//         //         from: 0,
//         //         to: 1,
//         //         duration: 250,
//         //       },
//         //     },
//         //   },
//         // },
//         // customTransition: {
//         //   animations: [
//         //     //   ...elements.map(data => ({
//         //     //   type: 'sharedElement',
//         //     //   fromId: data.fromId,
//         //     //   toId: data.toId,
//         //     //   startDelay: 0,
//         //     //   springVelocity: 0.2,
//         //     //   // springDamping: 0.5,
//         //     //   duration: 0.5,
//         //     //   interactivePop: true
//         //     // })),
//         //     {
//         //       fromId: 'detailContent',
//         //       x: { from: 0 },
//         //       y: { from: appStyle.height },
//         //       startAlpha: 0,
//         //       startDelay: 0,
//         //       duration: 0.8,
//         //       springVelocity: 0.2,
//         //     },
//         //     {
//         //       fromId: 'footer',
//         //       x: { from: 0 },
//         //       y: { from: appStyle.height },
//         //       startAlpha: 0,
//         //       startDelay: 0.2,
//         //       duration: 1,
//         //       springDamping: 1,
//         //     },
//         //   ],
//         //   duration: Platform.OS === 'android' ? 0.8 : 1,
//         // },
//       },
//     },
//   });
// };

export const pop = componentId => {
  Navigation.pop(componentId);
};
