import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Colors, Fonts } from 'themes';
import { push, dismissLightBox } from 'navigation/navigationActions';
import I18n from 'i18n-js';
// import components
import Text from 'uikit/src/Text';
import Icon from 'react-native-vector-icons/mealplanner';
import Button from 'uikit/src/Button';
import PropTypes from 'prop-types';
import PopupWrapper from './PopupWrapper';

const NoticePopup = ({
  componentId,
  hasCloseBtn,
  confirmText,
  onConfirm,
  desc,
  title,
  icon,
  closeButtonText,
}) => {
  const onClose = () => {
    dismissLightBox(componentId);
  };

  const onOk = () => {
    onConfirm && onConfirm();
    dismissLightBox(componentId);
  };

  return (
    <PopupWrapper
      contentStyle={[styles.innerRowContainer]}
      onClose={onClose}
      center
    >
      <View style={styles.iconTitle}>
        <Icon style={styles.icon} name={icon} size={120} />
      </View>
      <Text type="largeTitle" style={styles.title}>
        {title}
      </Text>
      <Text type="title20" style={styles.subTitle}>
        {desc}
      </Text>
      {confirmText && (
        <Button
          transparent
          style={styles.btn}
          textStyle={styles.btnTxtStyle}
          buttonTitle={confirmText}
          onPress={onOk}
        />
      )}
      {hasCloseBtn ? (
        <Button
          transparent
          style={[styles.btn, styles.noBtn]}
          textStyle={[styles.btnTxtStyle, styles.noTxtStyle]}
          buttonTitle={closeButtonText || I18n.translate('button.close')}
          onPress={onClose}
        />
      ) : (
        <Button
          transparent
          wrapperStyle={styles.btnClose}
          onPress={onClose}
          iconSize={40}
          iconColor={Colors.primary}
          ionicons="ios-close"
        />
      )}
    </PopupWrapper>
  );
};

NoticePopup.propTypes = {
  hasCloseBtn: PropTypes.bool,
  confirmText: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  icon: PropTypes.string,
  onConfirm: PropTypes.func,
  closeButtonText: PropTypes.string,
};

NoticePopup.defaultProps = {
  icon: 'checked',
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  innerRowContainer: {
    padding: 30,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: width - 30,
    maxHeight: height - 120,
    alignSelf: 'center',
    textAlign: 'center',
  },
  iconTitle: {
    textAlign: 'center',
  },
  icon: {
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    marginBottom: 40,
    textAlign: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    marginVertical: 10,
    color: Colors.primary,
  },
  noBtn: {
    borderColor: Colors.primaryTextBlur,
  },
  btnTxtStyle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: Fonts.fontWeight.semibold,
  },
  noTxtStyle: {
    color: Colors.primaryTextBlur,
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
  },
});

export default NoticePopup;
