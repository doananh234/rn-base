import React from 'react';
import {
 View, StyleSheet,
} from 'react-native';
import I18n from 'i18n-js';
import {
 Colors,
} from '../../themes';
import Text from '../../ui/Text';
import BackgroundImage from '../../ui/BackgroundImage';

const About = () => {
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <View style={[styles.container, styles.center]}>
        <Text center type="headline" color={Colors.default} style={styles.txtTitle}>
          {I18n.t('appName')}
        </Text>
        <Text center type="body2" style={styles.text} color={Colors.default}>
          {I18n.t('appDescription')}
        </Text>
      </View>
      <Text type="body2Bold" center style={styles.text} color={Colors.default}>
        {I18n.t('devBy')}
      </Text>
    </View>
  );
};
About.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  text: {
    padding: 30,
    paddingTop: 0,
  },
  txtTitle: {
    paddingVertical: 30,
  },
});

export default About;
