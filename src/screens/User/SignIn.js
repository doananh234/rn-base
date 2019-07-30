import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes';
import KeyboardAwareScrollViewUI from '../../components/KeyboardAwareScrollView';
import Button from '../../components/Button';
import LoginActions from '../../redux/LoginRedux/actions';
import { push, pop } from '../../navigation/navigationActions';
import { login } from '../../navigation/navigationButtons';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Divider from '../../components/Divider';
import { FacebookButton, GoogleButton } from '../../components/SocialButton';
import Input from '../../components/Input';

class SignIn extends Component {
  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('SignIn'),
        },
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
    this.password = React.createRef();
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'Signup') {
      this.signUp();
    }
  };

  signUp = () => {
    const { componentId, isFromSignUp } = this.props;
    isFromSignUp
      ? pop(componentId)
      : push(componentId, 'Signup', {
          title: I18n.t('intro.signUp'),
          passProps: {
            isFromSignIn: true,
          },
          rightButtons: [login()],
        });
  };

  login = () => {
    const { signIn } = this.props;
    if (this.email.current.getText() && this.password.current.getText()) {
      const data = {
        email: this.email.current.getText(),
        password: this.password.current.getText(),
      };
      signIn(data);
    }
  };

  forgotPass = () => {
    const { componentId } = this.props;
    push(componentId, 'ForgotPassword', {
      title: I18n.t('userInfo.password.forgotPassword'),
    });
  };

  facebookSignIn = () => {
    const { fbSignIn } = this.props;
    fbSignIn();
  };

  googleSignIn = () => {
    const { googleLogin } = this.props;
    googleLogin();
  };

  focusNextField(nextField) {
    this[nextField].current.focus();
  }

  renderInputView = () => {
    return (
      <View style={styles.vInput}>
        <Input
          icon="email"
          ref={this.email}
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField('password')}
          placeholder={I18n.t('userInfo.email')}
        />
        <Divider style={styles.divider} />
        <Input
          icon="password"
          ref={this.password}
          secureTextEntry
          onSubmitEditing={this.login}
          placeholder={I18n.t('userInfo.password.title')}
        />
      </View>
    );
  };

  renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Button
          secondary
          style={styles.btn}
          onPress={this.login}
          buttonTitle={I18n.t('button.login')}
        />
        <Text
          type="body3SemiBold"
          onPress={this.forgotPass}
          style={styles.txtForgotPass}
          color={Colors.primaryText}
        >
          {`${I18n.t('userInfo.password.forgotPassword')} `}
        </Text>
        <View style={styles.row}>
          <Divider />
          <Text style={styles.txtOr} type="body3SemiBold">
            {I18n.t('text.or')}
          </Text>
          <Divider />
        </View>
        <View style={styles.vSocialButton}>
          <FacebookButton onPress={this.facebookSignIn} />
          <GoogleButton onPress={this.googleSignIn} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <Container>
        <KeyboardAwareScrollViewUI>
          {this.renderInputView()}
          {this.renderButtonGroup()}
        </KeyboardAwareScrollViewUI>
      </Container>
    );
  }
}
SignIn.propTypes = {
  signIn: PropTypes.func,
  componentId: PropTypes.string,
  fbSignIn: PropTypes.func,
  googleLogin: PropTypes.func,
  isFromSignUp: PropTypes.bool,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  vInput: {
    marginTop: 35,
    backgroundColor: Colors.default,
  },
  vButtonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  btn: {
    width: width - 30,
    marginTop: 20,
  },
  txtForgotPass: {
    marginVertical: 27,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtOr: {
    paddingHorizontal: 15,
    color: Colors.secondaryText,
  },
  vSocialButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
    marginTop: 20,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightDivider,
    marginLeft: 15,
  },
});

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: data => dispatch(LoginActions.signIn(data)),
    fbSignIn: () => dispatch(LoginActions.fbSignIn()),
    googleLogin: () => dispatch(LoginActions.googleLogin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
