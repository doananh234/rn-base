import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/mealplanner';
import { Colors } from '../../themes/index';
import Text from '../../ui/Text';

const SettingItem = ({
  onPress,
  noBottomBorder,
  title,
  subTitle,
  unShowArrow,
  icon,
  backgroundColor,
  iconColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          noBottomBorder && {
            borderBottomWidth: 0,
            borderBottomColor: Colors.primaryText,
          },
        ]}
      >
        <View style={[styles.vIcon, { backgroundColor }]}>
          <Icon name={icon} style={[styles.icon, { color: iconColor }]} />
        </View>
        <View style={styles.content}>
          <Text type="body1SemiBold" style={styles.txtTitle}>
            {I18n.t(title)}
          </Text>
          {subTitle && (
            <Text numberOfLines={1} type="semi">
              {I18n.t(subTitle)}
            </Text>
          )}
        </View>
        {!unShowArrow && (
          <Icon name="foward" size={15} color="rgba(0, 0, 0, 0.25)" />
        )}
      </View>
    </TouchableOpacity>
  );
};

SettingItem.propTypes = {
  onPress: PropTypes.func,
  noBottomBorder: PropTypes.bool,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  unShowArrow: PropTypes.bool,
  icon: PropTypes.string,
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 10,
    backgroundColor: Colors.default,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    color: Colors.primaryText,
  },
  subTitle: {
    color: Colors.primaryTextBlur,
    flex: 3,
    marginRight: 6,
    textAlign: 'right',
  },
  vIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingItem;
