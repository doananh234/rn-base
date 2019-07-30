import { Colors, Fonts } from '../themes';
import { iconsMap } from '../utils/appIcons';
// import { styles as TextStyle } from '../components/Text';

export const animations = {
  // push: {
  //   enabled: true,
  //   topBar: {
  //     alpha: {
  //       from: 0,
  //       to: 1,
  //     },
  //   },
  //   content: {
  //     alpha: {
  //       from: 1,
  //       to: 1,
  //     },
  //   },
  // },
  // pop: {
  //   enabled: true,
  //   topBar: {
  //     alpha: {
  //       from: 1,
  //       to: 1,
  //     },
  //   },
  //   content: {
  //     alpha: {
  //       from: 1,
  //       to: 1,
  //     },
  //   },
  // },
  showModal: {
    enabled: false,
  },
  dismissModal: {
    enabled: false,
  },
};

export const navigatorHiddenTab = {
  tabBarHidden: true,
};

export const navigatorStyle = {
  popGesture: true,
  topBar: {
    visible: true,
    drawBehind: true,
    animate: false,
    hideOnScroll: false,
    elevation: 0,
    noBorder: true,
    buttonColor: Colors.titleNav,
    title: {
      fontSize: 17,
      color: Colors.titleNav,
      alignment: 'center',
      fontFamily: Fonts.type.semiBold,
    },
    background: {
      color: 'transparent',
    },
    // largeTitle: {
    //   visible: true,
    //   ...TextStyle.largeTitle,
    // },
    backButton: {
      icon: iconsMap.back,
      visible: true,
      color: Colors.titleNav,
    },
  },
  layout: {
    componentBackgroundColor: Colors.background,
    backgroundColor: Colors.background,
    orientation: ['portrait', 'landscape'],
  },
  animations,
};

export const navigatorHavNavStyle = {
  navBarBackgroundColor: Colors.secondary,
  navBarTextColor: Colors.titleNav,
  navBarButtonColor: Colors.titleNav,
  navBarRightButtonColor: Colors.primary,
  screenBackgroundColor: Colors.background,
  disabledButtonColor: Colors.disabledNavButons,
  navBarButtonFontWeight: '900',
  statusBarTextColorSchemeSingleScreen: 'light',
  // navBarTextFontFamily: Fonts.type.bold,
};

export const bottomTabs = {
  backgroundColor: Colors.tabBackground,
  visible: true,
  animate: false,
  // currentTabIndex: 0,
  // currentTabId: 'currentTabId',
  // testID: 'bottomTabsTestID',
  drawBehind: false,
  translucent: true,
  hideShadow: false,
};
