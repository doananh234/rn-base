import React, {
 useRef,
} from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import {
 View, StyleSheet, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/mealplanner';
import {
 useNavigation,
} from 'react-navigation-hooks';
import {
 useDispatch, useSelector,
} from 'react-redux';
import {
 Colors,
} from '../../themes';
import KeyboardAwareScrollViewUI from '../../ui/KeyboardAwareScrollView';
import Button from '../../ui/Button';
import Container from '../../ui/Container';
import Text from '../../ui/Text';
import Divider from '../../ui/Divider';
import {
 FacebookButton, GoogleButton,
} from '../../ui/SocialButton';
import Touchable from '../../ui/Touchable';
import Input from '../../ui/Input';
import LoginActions from '../../redux/LoginRedux/actions';

const SignIn = React.memo(() => {
  const isLogged = useSelector(state => state.login.isLogged);
  const { navigate } = useNavigation();

  // TODO: Hooks
  const email = useRef();
  const password = useRef();

  const dispatch = useDispatch();

  signUp = () => {
  };

  const login = () => {
    if (email.current.getText() && password.current.getText()) {
      const data = {
        email: email.current.getText(),
        password: password.current.getText(),
      };
      dispatch(LoginActions.signIn(data));
    }
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
});

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

SignIn.navigationOptions = ({
  navigation,
}) => {
  const onShowSignUp = () => {
    navigation.push('SignUp');
  };
  return {
    title: I18n.t('intro.signIn'),
    headerRight: (
      <Touchable onPress={onShowSignUp}>
        <View style={{ marginRight: 20 }}>
          <Text style={{ color: Colors.whiteSmoke }}>
            Sign Up
          </Text>
        </View>
      </Touchable>
    ),
    headerStyle: {
      backgroundColor: Colors.secondary,
    },
    headerLeft: (
      <Touchable onPress={() => navigation.goBack(null)}>
        <Icon name="back" size={20} color={Colors.whiteSmoke} style={{ marginLeft: 20 }} />
      </Touchable>
    ),
    headerTintColor: Colors.whiteSmoke,
  };
};

export default SignIn;
