import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import I18n from 'i18n-js';
import { Colors } from '../../themes';
import Text from '../../ui/Text';
import Button from '../../ui/Button';
import PopupWrapper from '../../components/Popup/PopupWrapper';
// import { dismissLightBox } from '../../navigation/navigationActions';

const ComingSoonPopup = ({ componentId }) => {
  // const onClose = () => dismissLightBox(componentId);
  return (
    <PopupWrapper onClose={onClose}>
      <View style={styles.innerContainer}>
        <Text type="headline" style={styles.title}>
          {I18n.t('comingsoon.title')}
        </Text>
        <Text type="body2" style={styles.description}>
          {I18n.t('comingsoon.description')}
        </Text>
        <Button
          textStyle={{ color: Colors.default }}
          style={styles.backBtn}
          buttonTitle={I18n.t('button.back')}
          onPress={onClose}
        />
      </View>
    </PopupWrapper>
  );
};

ComingSoonPopup.propTypes = {
  componentId: PropTypes.string,
};

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    width,
    height,
  },
  overlay: {
    flex: 1,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: -1,
    borderRadius: 20,
    backgroundColor: Colors.default,
    marginHorizontal: 10,
  },
  title: {
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.primaryText,
    marginBottom: 20,
  },
  description: {
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.lightGray,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  backBtn: {
    backgroundColor: Colors.primaryText,
    borderRadius: 20,
    height: 40,
    width: 100,
  },
};

export default ComingSoonPopup;
