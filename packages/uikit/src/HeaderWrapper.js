import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import {View} from 'react-native';
import Text from './Text';

const HeaderWrapper = ({subTitle, style}) => {
  return (
    <View style={style}>
      <Text type="largeTitle">{I18n.t(subTitle)}</Text>
    </View>
  );
};
HeaderWrapper.propTypes = {
  subTitle: PropTypes.string,
  style: PropTypes.any,
};

export default HeaderWrapper;
