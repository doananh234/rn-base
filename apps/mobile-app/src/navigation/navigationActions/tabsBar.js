import { Navigation } from 'react-native-navigation';
import { Colors, Fonts } from 'themes';
import { iconsMap } from 'utils/appIcons';
import { filter } from 'navigation/navigationButtons';
import { navigatorStyle, animations } from '../navigatonStyle';

export const startWithTabs = () => {
  const customTopBar = {
    visible: false,
    drawBehind: true,
    background: {
      color: 'transparent',
      translucent: true,
    },
    rightButtons: [filter(Colors.default)],
  };

  const Tabs = [
    {
      icon: iconsMap.dish,
      screen: 'Home',
      options: {
        topBar: customTopBar,
      },
    },
    {
      icon: iconsMap.calendar,
      screen: 'Calendar',
      options: {
        topBar: customTopBar,
      },
    },
    {
      icon: iconsMap.user,
      screen: 'Setting',
      options: {
        topBar: {
          elevation: 0,
          noBorder: true,
          visible: false,
          background: {
            color: Colors.default,
          },
        },
      },
    },
  ];

  const children = Tabs.map(data => ({
    stack: {
      children: [
        {
          component: {
            name: data.screen,
            options: {
              ...data.options,
              topBar: {
                elevation: 0,
                buttonColor: Colors.iconNav,
                backButton: {
                  icon: iconsMap.back,
                  visible: false,
                  color: Colors.iconNav,
                },
                ...data.options?.topBar,
              },
              statusBar: {
                style: 'light',
              },
              layout: navigatorStyle.layout,
              popGesture: true,
              animations,
            },
          },
        },
      ],
      options: {
        topBar: {
          elevation: 0,
          buttonColor: Colors.iconNav,
          backButton: {
            icon: iconsMap.back,
            visible: false,
            color: Colors.iconNav,
          },
        },
        popGesture: true,
        layout: navigatorStyle.layout,
        bottomTab: configTab(data),
        animations,
      },
    },
  }));

  Navigation.setRoot({
    root: {
      options: {
        popGesture: true,
        topBar: {
          visible: true,
          height: 200,
          elevation: 0,
          noBorder: true,
          buttonColor: Colors.iconNav,
        },
        // layout: navigatorStyle.layout,
        animations,
      },
      bottomTabs: {
        children,
        options: {
          popGesture: true,
          // bottomTabs,
          bottomTabs: {
            titleDisplayMode: 'alwaysHide',
            backgroundColor: Colors.tabBackground,
            barStyle: 'default',
            translucent: false,
            hideShadow: true,
          },
          // layout: navigatorStyle.layout,
          animations,
        },
      },
    },
  });
};

const configTab = data => ({
  // title: data.title,
  icon: data.icon,
  text: data.label,
  // badge: '2',
  // badgeColor: 'red',
  textColor: Colors.tabIcon,
  iconColor: Colors.tabIcon,
  selectedIconColor: Colors.tabSelected,
  selectedTextColor: Colors.primaryText,
  iconInsets: {
    top: 5,
    left: 0,
    bottom: -5,
    right: 0,
  },
  fontSize: 10,
  drawBehind: false,
  fontFamily: Fonts.type.semiBold,
  titleDisplayMode: 'alwaysHide',
  disableIconTint: true, // set true if you want to disable the icon tinting
  disableSelectedIconTint: true,
});

export const goHome = () => {
  startWithTabs();
};
