import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';
import { navigatorStyle } from '../navigatonStyle';

export function startStackScreen(screen = 'IntroWithSlide', title = '', isHaveNav = false) {
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
