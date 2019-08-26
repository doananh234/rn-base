import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../themes';
import KeyboardAwareScrollViewUI from '../../ui/KeyboardAwareScrollView';
import Button from '../../ui/Button';
import LoginActions from '../../redux/LoginRedux/actions';
// import { push, pop } from '../../navigation/navigationActions';
// import { login } from '../../navigation/navigationButtons';
import Container from '../../ui/Container';
import Text from '../../ui/Text';
import Divider from '../../ui/Divider';
import { FacebookButton, GoogleButton } from '../../ui/SocialButton';
import Input from '../../ui/Input';

function SignIn() {
  const email = useRef();
  const password = useRef();
  signUp = () => {
  };

  const login = () => {
    global.token = 'token_demo';
    alert(global.token);
    // const { signIn } = props;
    // if (email.current.getText() && password.current.getText()) {
    //   const data = {
    //     email: email.current.getText(),
    //     password: password.current.getText(),
    //   };
    //   signIn(data);
    // }
  };

  const forgotPass = () => {
    // const { componentId } = props;
    // push(componentId, 'ForgotPassword', {
    //   title: I18n.t('userInfo.password.forgotPassword'),
    // });
  };

  const facebookSignIn = () => {
    // const { fbSignIn } = .props;
    // fbSignIn();
  };

  const googleSignIn = () => {
    // const { googleLogin } = props;
    // googleLogin();
  };

  const focusNextField = nextField => {
    // this[nextField].current.focus();
  };

  const renderInputView = () => {
    return (
      <View style={styles.vInput}>
        <Input
          icon="email"
          ref={email}
          returnKeyType="next"
          onSubmitEditing={() => focusNextField('password')}
          placeholder={I18n.t('userInfo.email')}
        />
        <Divider style={styles.divider} />
        <Input
          icon="password"
          ref={password}
          secureTextEntry
          onSubmitEditing={login}
          placeholder={I18n.t('userInfo.password.title')}
        />
      </View>
    );
  };

  const renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Button
          secondary
          style={styles.btn}
          onPress={login}
          buttonTitle={I18n.t('button.login')}
        />
        <Text
          type="body3SemiBold"
          onPress={forgotPass}
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
          <FacebookButton onPress={facebookSignIn} />
          <GoogleButton onPress={googleSignIn} />
        </View>
      </View>
    );
  };

  return (
    <Container>
      <KeyboardAwareScrollViewUI>
        {renderInputView()}
        {renderButtonGroup()}
      </KeyboardAwareScrollViewUI>
    </Container>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func,
  // componentId: PropTypes.string,
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

export default React.memo(SignIn);

// function mapStateToProps() {
//   return {};
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     signIn: data => dispatch(LoginActions.signIn(data)),
//     fbSignIn: () => dispatch(LoginActions.fbSignIn()),
//     googleLogin: () => dispatch(LoginActions.googleLogin()),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(SignIn);
