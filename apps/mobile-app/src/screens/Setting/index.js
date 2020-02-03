import React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import I18n from 'i18n-js';

import { Colors } from 'themes';
import LoginActions from '@redux/AuthRedux/actions';
import Divider from 'uikit/src/Divider';
import Button from 'uikit/src/Button';
import Text from 'uikit/src/Text';
import { showModal } from 'navigation/navigationActions';
import SettingItem from '../../components/Items/SettingItem';
import UserInfo from './UserInfo';
import { shareApp, openURL } from '../../utils/tools';

function Setting(props) {
  const { data: user, isLogged } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onPressPrivacy = () => {
    // showLightBox('ComingSoonPopup');
  };

  const editProfile = () => {};

  const share = () => {
    shareApp();
  };

  const rate = () => {
    openURL(I18n.t('appInfo.shareAppURL'), true);
  };

  const goTerms = () => {};

  const openFAQ = () => {};

  const beComeTutor = () => {};

  const showChatBox = () => {};

  const openAbout = () => {
    // const { componentId } = props;
    // push(componentId, 'About', {
    //   topBar: {
    //     background: {
    //       color: 'transparent',
    //     },
    //     largeTitle: {
    //       visible: false,
    //     },
    //     backButton: backCircle(),
    //   },
    // });
  };

  const openContact = () => {
    // const { componentId } = props;
    // push(componentId, 'Contact', {
    //   title: I18n.t('moreText.contact'),
    //   topBar: {
    //     largeTitle: {
    //       visible: false,
    //     },
    //   },
    // });
  };

  const signIn = () => {
    // const { componentId, token } = props;
    // push(componentId, token ? 'Signup' : 'SignIn', {
    //   title: token ? I18n.t('moreText.account.editProfile') : I18n.t('SignIn'),
    //   passProps: {
    //     isEdit: true,
    //   },
    //   rightButtons: token ? [] : [signUp()],
    // });
  };

  const onPressSetting = (screen, title, passProps) => () => {
    // const { componentId } = props;
    // push(componentId, screen, {
    //   title: I18n.t(title),
    //   passProps,
    //   topBar: {
    //     largeTitle: {
    //       visible: false,
    //     },
    //   },
    // });
  };

  const getPremium = () => {
    showModal('Purchase', {
      topBar: {
        background: {
          color: 'transparent',
        },
        drawBehind: true,
      },
    });
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.header} type="body3SemiBold">
      {I18n.t(title)}
    </Text>
  );

  const renderItem = ({ item }) => {
    if (item.key === 'profile') {
      return (
        <View style={styles.vAccount}>
          <SettingItem onPress={item.onPress} {...item} />
          <Button
            secondary
            onPress={getPremium}
            icon="crown"
            iconStyle={{ color: Colors.default }}
            textStyle={{ color: Colors.default }}
            buttonTitle={I18n.t('moreText.account.getPremium')}
            style={styles.btnPremium}
          />
        </View>
      );
    }
    return <SettingItem onPress={item.onPress} {...item} />;
  };

  const signOut = () => {
    dispatch(LoginActions.signOut());
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isLogged && (
          <Button
            textStyle={styles.txtButton}
            onPress={signOut}
            style={styles.btnLogout}
            buttonTitle={I18n.t('moreText.logout')}
          />
        )}
      </View>
    );
  };

  const SECTIONS_LIST = [
    {
      title: 'moreText.account.title',
      data: [
        {
          key: 'profile',
          title: isLogged
            ? 'moreText.account.editProfile'
            : 'moreText.account.signIn_signUp',
          subTitle: isLogged ? null : 'moreText.account.signIn_signUpDes',
          backgroundColor: Colors.lightPink,
          iconColor: Colors.pink,
          icon: 'user',
          onPress: signIn,
        },
      ],
    },
    {
      title: 'moreText.list.title',
      data: [
        {
          key: 'favorites',
          title: 'moreText.list.favorites',
          backgroundColor: Colors.lightGreen,
          iconColor: Colors.green,
          icon: 'love-fill',
          screen: 'favorites',
          onPress: onPressSetting('Favourites', 'moreText.list.favorites'),
        },
        {
          key: 'MyOwnRecipes',
          title: 'moreText.list.myOwnRecipes',
          backgroundColor: Colors.lightRed,
          iconColor: Colors.red,
          icon: 'knife',
          screen: 'MyOwnRecipes',
          onPress: onPressSetting('MyOwnRecipes', 'moreText.list.myOwnRecipes'),
        },
      ],
    },
    {
      title: 'moreText.share.title',
      data: [
        {
          key: 'rateUse',
          title: 'moreText.share.rateUse',
          backgroundColor: Colors.lightOrange,
          iconColor: Colors.orange,
          icon: 'start',
          screen: 'rateUse',
          onPress: rate,
        },
        {
          key: 'shareApp',
          title: 'moreText.share.shareApp',
          backgroundColor: Colors.lightViolet,
          iconColor: Colors.violet,
          icon: 'share',
          screen: 'shareApp',
          onPress: share,
        },
      ],
    },
    {
      title: 'moreText.legal.title',
      data: [
        {
          key: 'privacy',
          title: 'moreText.legal.privacy',
          backgroundColor: Colors.lightGray,
          iconColor: Colors.gray,
          icon: 'shield',
          screen: 'privacyAndPolice',
          onPress: onPressSetting('WebView', 'moreText.legal.privacy', {
            uri: I18n.t('appInfo.privacyPolicyURL'),
          }),
        },
        {
          key: 'terms',
          title: 'moreText.legal.terms',
          backgroundColor: Colors.lightBlue,
          iconColor: Colors.blue,
          icon: 'file',
          screen: 'termsAndUse',
          onPress: onPressSetting('WebView', 'moreText.legal.terms', {
            uri: I18n.t('appInfo.termsURL'),
          }),
        },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <UserInfo user={user} onPress={editProfile} />
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={SECTIONS_LIST}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: Colors.background,
  },
  divider: {
    width: 75,
    height: 1,
    backgroundColor: Colors.default,
  },
  btnLogout: {
    marginBottom: 40,
    borderRadius: 0,
    backgroundColor: Colors.default,
  },
  footer: {
    paddingTop: 40,
  },
  txtButton: {
    color: Colors.secondary,
  },
  vAccount: {
    backgroundColor: Colors.default,
  },
  btnPremium: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: 45,
    marginTop: 15,
  },
});

Setting.propTypes = {};

export default Setting;
