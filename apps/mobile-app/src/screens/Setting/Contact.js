import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import I18n from 'i18n-js';
import {Colors, Images} from 'themes';
import Text from 'uikit/src/Text';
import Button from 'uikit/src/Button';
import Container from 'uikit/src/Container';
import {openURL} from '../../utils/tools';
import Divider from 'uikit/src/Divider';

const Contact = () => {
  const CONTACTS = [
    {
      title: 'contact.group.name',
      phone: 'contact.group.phone',
      facebook: 'contact.group.facebook',
      logo: Images.defaultGroupLogo,
    },
    {
      title: 'contact.enouvo.name',
      phone: 'contact.enouvo.phone',
      facebook: 'contact.enouvo.facebook',
      logo: Images.enouvoLogo,
    },
  ];

  const onPressCall = phoneNumber => () => {
    openURL(`tel:${phoneNumber}`);
  };

  const onPressFacebook = facebookLink => () => {
    openURL(facebookLink, true);
  };

  return (
    <Container style={styles.container}>
      {CONTACTS.map((data, index) => (
        <View key={data.title} style={styles.center}>
          {index !== 0 && (
            <View style={styles.row}>
              <Divider />
              <Text style={styles.txtOr}>{I18n.t('contact.or')}</Text>
              <Divider />
            </View>
          )}
          <Image resizeMode="contain" style={styles.logo} source={data.logo} />
          <Text type="headline">{I18n.t(data.title)}</Text>
          <View style={styles.row}>
            <Button
              primary
              ionicons="ios-call"
              iconStyle={styles.icon}
              style={styles.btnCall}
              onPress={this.onPressCall(I18n.t(data.phone))}
            />
            <Button
              secondary
              fontAwesome="facebook-f"
              iconStyle={styles.icon}
              style={styles.btnFacebook}
              onPress={this.onPressFacebook(I18n.t(data.facebook))}
            />
          </View>
        </View>
      ))}
    </Container>
  );
};
Contact.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 20,
    marginTop: 30,
  },
  btnCall: {
    width: 36,
    height: 36,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  btnFacebook: {
    width: 36,
    height: 36,
    marginHorizontal: 5,
    marginBottom: 5,
    backgroundColor: Colors.facebook,
  },
  icon: {
    fontSize: 17,
    marginRight: 0,
    color: Colors.default,
  },
  txtOr: {
    marginHorizontal: 20,
    color: Colors.secondaryText,
  },
});

export default Contact;
