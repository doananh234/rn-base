import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { Colors, Fonts } from 'themes';
import { safeArea } from 'utils/Devices';
import { dismissLightBox } from 'navigation/navigationActions';
import I18n from 'i18n-js';
import PopupWrapper from './PopupWrapper';

const PopupItemEvent = ({ data, textProp, hasClose, componentId, onPress }) => {
  const [height, setHeight] = useState(0);

  const onSelectItem = item => {
    if (item.id !== 'cancel') {
      onPress(item);
    }
    dismissLightBox(componentId);
  };

  useEffect(() => {
    setHeight(
      (data?.length + (hasClose ? 1 : 0)) * 58 + safeArea().paddingBottom,
    );
  }, [data, hasClose]);

  const renderRow = e => {
    return (
      <TouchableOpacity
        key={e[textProp]}
        underlayColor="transparent"
        onPress={() => onSelectItem(e)}
      >
        <View style={styles.vRow}>
          <Text style={[styles.txt, e.color && { color: e.color }]}>
            {e[textProp]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <PopupWrapper
      showCloseButton={false}
      contentStyle={[styles.innerRowContainer, { height }]}
      onClose={() => dismissLightBox(componentId)}
    >
      <View style={styles.footerSpace} />
      <ScrollView style={{ height: height - 120 }}>
        {data?.map(item => renderRow(item))}
        {hasClose &&
          renderRow({
            id: 'cancel',
            text: I18n.translate('button.cancel'),
            color: Colors.primary,
          })}
      </ScrollView>
    </PopupWrapper>
  );
};

PopupItemEvent.propTypes = {
  data: PropTypes.array,
  componentId: PropTypes.string,
  textProp: PropTypes.string,
  onPress: PropTypes.func,
  hasClose: PropTypes.bool,
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  innerRowContainer: {
    padding: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    maxHeight: height - 120,
  },
  vRow: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerSpace: {
    height: 70,
    position: 'absolute',
    bottom: -70,
    left: 0,
    right: 0,
    backgroundColor: Colors.default,
  },
  txt: {
    color: Colors.primaryText,
    fontWeight: Fonts.fontWeight.bold,
  },
});

export default PopupItemEvent;
