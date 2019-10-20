import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderButton} from 'react-navigation-header-buttons';

export const IoniconsHeader = passMeFurther => (
  // the `passMeFurther` variable here contains props from
  // <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton
    {...passMeFurther}
    IconComponent={Ionicons}
    iconSize={23}
    color="blue"
  />
);
