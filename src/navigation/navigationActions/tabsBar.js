import { Navigation } from 'react-native-navigation';
import I18n from 'i18n-js';
import { Colors, Fonts } from '../../themes/index';
import { navigatorStyle, animations } from '../navigatonStyle';
import { iconsMap } from '../../utils/appIcons';

export const startWithTabs = () => {
  const Tabs = [
    {
      label: I18n.t('tabs.recipes'),
      title: I18n.t('tabs.recipes'),
      icon: iconsMap.dish,
      screen: 'Home',
      options: {
        // ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: false,
          drawBehind: true,
          elevation: 1,
          noBorder: false,
          title: {
            text: I18n.t('tabs.recipes'),
            color: Colors.titleNav,
          },
          background: {
            color: Colors.default,
          },
          backButton: {
            visible: false,
          },
        },
      },
    },
    {
      label: I18n.t('tabs.calendar'),
      title: I18n.t('tabs.calendar'),
      icon: iconsMap.calendar,
      screen: 'Calendar',
      options: {
        // ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: true,
          elevation: 1,
          noBorder: false,
          drawBehind: true,
          title: {
            text: I18n.t('tabs.calendar'),
            color: Colors.titleNav,
          },
          largeTitle: {
            visible: false,
          },
          background: {
            color: Colors.default,
          },
          backButton: {
            visible: false,
          },
        },
      },
    },
    {
      label: I18n.t('tabs.setting'),
      title: I18n.t('tabs.setting'),
      id: 'Setting',
      icon: iconsMap.user,
      screen: 'Setting',
      options: {
        // ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: false,
          drawBehind: true,
          background: {
            color: 'transparent',
          },
          backButton: {
            visible: false,
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
              layout: navigatorStyle.layout,
              popGesture: true,
              animations,
            },
          },
        },
      ],
      options: {
        bottomTabs: {
          drawBehind: false,
          translucent: true,
          hideShadow: false,
        },
        topBar: {
          backButton: {
            icon: iconsMap.back,
            visible: true,
            color: Colors.titleNav,
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
          elevation: 0,
          noBorder: true,
        },
        layout: navigatorStyle.layout,
        animations,
      },
      bottomTabs: {
        children,
        options: {
          ...navigatorStyle,
          popGesture: true,
          // bottomTabs,
          bottomTabs: {
            // titleDisplayMode: 'alwaysHide',
            backgroundColor: Colors.tabBackground,
          },
          layout: navigatorStyle.layout,
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
  // iconInsets: {
  //   top: 5,
  //   left: 0,
  //   bottom: -5,
  //   right: 0,
  // },
  fontSize: 10,
  drawBehind: false,
  fontFamily: Fonts.type.semiBold,
  // titleDisplayMode: 'alwaysHide',
  disableIconTint: true, // set true if you want to disable the icon tinting
  disableSelectedIconTint: true,
});

export const goHome = () => {
  startWithTabs();
};
