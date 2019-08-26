import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import { Colors } from '../../themes';
import Button from '../../ui/Button';
import { FacebookButton, GoogleButton } from '../../ui/SocialButton';
import Text from '../../ui/Text';
// import { push, startWithTabs } from '../../navigation/navigationActions';
import CheckUpdate from '../Home/CheckUpdate';
import { safeArea } from '../../utils/Devices';
import BackgroundImage from '../../ui/BackgroundImage';
import LoginActions from '../../redux/LoginRedux/actions';
// import { signUp, login } from '../../navigation/navigationButtons';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
    this.password = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  signUp = () => {
    const { componentId } = this.props;
    // push(componentId, 'Signup', {
    //   title: I18n.t('intro.signUp'),
    //   rightButtons: [login()],
    // });
  };

  skip = () => {
    const { skipLogin } = this.props;
    skipLogin();
    // startWithTabs();
  };

  signIn = () => {
    const { componentId } = this.props;
    // push(componentId, 'SignIn', {
    //   title: I18n.t('SignIn'),
    //   rightButtons: [signUp()],
    // });
  };

  facebookSignIn = () => {
    const { fbSignIn } = this.props;
    fbSignIn();
  };

  googleSignIn = () => {
    const { googleLogin } = this.props;
    googleLogin();
  };

  renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Button
          secondary
          style={styles.btnLogin}
          onPress={this.signUp}
          buttonTitle={I18n.t('intro.signUp')}
        />
        {/* <View style={{ flex: 1 }} /> */}
        <Button
          transparent
          style={styles.btnSkip}
          onPress={this.skip}
          textStyle={styles.txtBtn}
          buttonTitle={I18n.t('button.skip')}
        />
        <Text style={styles.txtSignIn} onPress={this.signIn}>
          {I18n.t('intro.alreadyMember')}
          <Text type="body2Bold" color={Colors.primaryText}>
            {I18n.t('intro.signIn')}
          </Text>
        </Text>
        <View style={styles.vSocialButton}>
          <FacebookButton onPress={this.facebookSignIn} />
          <GoogleButton onPress={this.googleSignIn} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckUpdate />
        <BackgroundImage imageName="backgroundIntro" />
        {this.renderButtonGroup()}
      </View>
    );
  }
}

Intro.propTypes = {
  fbSignIn: PropTypes.func,
  googleLogin: PropTypes.func,
  skipLogin: PropTypes.func,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    width,
  },
  vButtonGroup: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: safeArea().paddingBottom,
  },
  vIntro: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  vContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  introImg: {
    width: width - 80,
  },
  txtIntroDes: {
    marginTop: 15,
  },
  txtBtn: {
    color: Colors.primaryText,
  },
  vSocialButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
  },
  btnLogin: {
    width: width - 30,
  },
  btnSkip: {
    borderWidth: 1,
    borderColor: Colors.black,
    width: width - 30,
    marginTop: 20,
  },
  txtSignIn: {
    marginVertical: 20,
    color: Colors.primaryText,
  },
});

Intro.propTypes = {
  // signIn: PropTypes.func,
  componentId: PropTypes.string,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    fbSignIn: () => dispatch(LoginActions.fbSignIn()),
    googleLogin: () => dispatch(LoginActions.googleLogin()),
    skipLogin: () => dispatch(LoginActions.skipLogin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro);
