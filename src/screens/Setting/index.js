import React, { Component } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import { Colors } from '../../themes';
import UserInfo from './UserInfo';
import SettingItem from '../../components/Items/SettingItem';
import LoginActions from '../../redux/LoginRedux/actions';
import Divider from '../../ui/Divider';
import Button from '../../ui/Button';
import Text from '../../ui/Text';
import { shareApp, openURL } from '../../utils/tools';

class Setting extends Component {
  static navigatorStyle = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  onPressPrivacy = () => {
    // showLightBox('ComingSoonPopup');
  };

  editProfile = () => {};

  share = () => {
    shareApp();
  };

  rate = () => {
    openURL(I18n.t('appInfo.shareAppURL'), true);
  };

  goTerms = () => {};

  openFAQ = () => {};

  beComeTutor = () => {};

  showChatBox = () => {};

  openAbout = () => {
    const { componentId } = this.props;
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

  openContact = () => {
    const { componentId } = this.props;
    // push(componentId, 'Contact', {
    //   title: I18n.t('moreText.contact'),
    //   topBar: {
    //     largeTitle: {
    //       visible: false,
    //     },
    //   },
    // });
  };

  signIn = () => {
    const { componentId, token } = this.props;
    // push(componentId, token ? 'Signup' : 'SignIn', {
    //   title: token ? I18n.t('moreText.account.editProfile') : I18n.t('SignIn'),
    //   passProps: {
    //     isEdit: true,
    //   },
    //   rightButtons: token ? [] : [signUp()],
    // });
  };

  onPressSetting = (screen, title, passProps) => () => {
    const { componentId } = this.props;
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

  getPremium = () => {
    // showModal('Purchase', {
    //   topBar: {
    //     background: {
    //       color: 'transparent',
    //     },
    //     drawBehind: true,
    //   },
    // });
  };

  renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.header} type="body3SemiBold">
      {I18n.t(title)}
    </Text>
  );

  renderItem = ({ item }) => {
    if (item.key === 'profile') {
      return (
        <View style={styles.vAccount}>
          <SettingItem onPress={item.onPress} {...item} />
          <Button
            secondary
            onPress={this.getPremium}
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

  renderFooter = () => {
    const { logout, token } = this.props;
    return (
      <View style={styles.footer}>
        {token && (
          <Button
            textStyle={styles.txtButton}
            onPress={logout}
            style={styles.btnLogout}
            buttonTitle={I18n.t('moreText.logout')}
          />
        )}
      </View>
    );
  };

  render() {
    const { user, token } = this.props;
    const SECTIONS_LIST = [
      {
        title: 'moreText.account.title',
        data: [
          {
            key: 'profile',
            title: token ? 'moreText.account.editProfile' : 'moreText.account.signIn_signUp',
            subTitle: token ? null : 'moreText.account.signIn_signUpDes',
            backgroundColor: Colors.lightPink,
            iconColor: Colors.pink,
            icon: 'user',
            onPress: this.signIn,
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
            onPress: this.onPressSetting('Favourites', 'moreText.list.favorites'),
          },
          {
            key: 'MyOwnRecipes',
            title: 'moreText.list.myOwnRecipes',
            backgroundColor: Colors.lightRed,
            iconColor: Colors.red,
            icon: 'knife',
            screen: 'MyOwnRecipes',
            onPress: this.onPressSetting('MyOwnRecipes', 'moreText.list.myOwnRecipes'),
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
            onPress: this.rate,
          },
          {
            key: 'shareApp',
            title: 'moreText.share.shareApp',
            backgroundColor: Colors.lightViolet,
            iconColor: Colors.violet,
            icon: 'share',
            screen: 'shareApp',
            onPress: this.share,
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
            onPress: this.onPressSetting('WebView', 'moreText.legal.privacy', {
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
            onPress: this.onPressSetting('WebView', 'moreText.legal.terms', {
              uri: I18n.t('appInfo.termsURL'),
            }),
          },
        ],
      },
    ];
    return (
      <View style={styles.container}>
        <UserInfo user={user} onPress={this.editProfile} />
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={SECTIONS_LIST}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ListFooterComponent={this.renderFooter}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  btnBecomeATutor: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
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

Setting.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  componentId: PropTypes.string,
  token: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    user: state.login.data,
    token: state.login.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(LoginActions.signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
