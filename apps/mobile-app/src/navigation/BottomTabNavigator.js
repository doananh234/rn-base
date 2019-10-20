import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import I18n from 'i18n-js';
import Icon from 'react-native-vector-icons/Ionicons';
import {mapValues} from 'lodash';
import Detail from 'screens/Home/Detail';
import Home from 'screens/Home';
import Setting from 'screens/Setting';
import Calendar from 'screens/Calendar';
import Modal from 'screens/Modal';

const BOTTOM_TABS = {
  HomeTab: {
    screens: {Home, Detail},
    title: 'tabs.home',
    tabBarLabel: 'tabs.home',
    tabBarIcon: 'ios-home',
  },
  CalendarTab: {
    screens: {Calendar},
    title: 'tabs.calendar',
    tabBarLabel: 'tabs.calendar',
    tabBarIcon: 'ios-calendar',
  },
  SettingTab: {
    screens: {Setting},
    title: 'tabs.setting',
    tabBarLabel: 'tabs.setting',
    tabBarIcon: 'ios-settings',
  },
};

const bottomTabs = mapValues(
  BOTTOM_TABS,
  ({screens, title, tabBarLabel, tabBarIcon}) =>
    createStackNavigator(
      {...screens, Modal},
      {
        // This applies to the parent navigator
        navigationOptions: ({navigation, navigationOptions}) => ({
          tabBarLabel: I18n.t(tabBarLabel),
          tabBarIcon: ({tintColor, focused, horizontal}) => (
            // eslint-disable-next-line react/react-in-jsx-scope
            <Icon
              name={tabBarIcon}
              size={horizontal ? 20 : 26}
              style={{color: tintColor}}
            />
          ),
        }),
        // This applies to child routes
        defaultNavigationOptions: () => ({
          title: I18n.t(title),
        }),
      },
    ),
);

export default createBottomTabNavigator(bottomTabs);
