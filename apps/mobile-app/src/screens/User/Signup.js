import React, {
 Component,
} from 'react';
import PropTypes from 'prop-types';
import {
 View, StyleSheet, Dimensions,
} from 'react-native';
import {
 connect,
} from 'react-redux';
import I18n from 'i18n-js';
import {
 Colors,
} from '../../themes';
import KeyboardAwareScrollView from '../../ui/KeyboardAwareScrollView';
import Text from '../../ui/Text';
import Button from '../../ui/Button';
import Avatar from '../../ui/Avatar';
import LoginActions from '../../redux/LoginRedux/actions';
import Container from '../../ui/Container';
import Input from '../../ui/Input';
import Divider from '../../ui/Divider';
import {
 FacebookButton, GoogleButton,
} from '../../ui/SocialButton';
// import { push, pop } from '../../navigation/navigationActions';
// import { signUp as btnSignUp } from '../../navigation/navigationButtons';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
    };
    this.userName = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'login') {
      this.signIn();
    }
  };

  signIn = () => {
    const { componentId, isFromSignIn } = this.props;
    // isFromSignIn
    //   ? pop(componentId)
    //   : push(componentId, 'SignIn', {
    //       title: I18n.t('SignIn'),
    //       passProps: {
    //         isFromSignUp: true,
    //       },
    //       rightButtons: [btnSignUp()],
    //     });
  };

  submitData = () => {
    const { userName, email, password } = this;
    const { isEdit, editUser, signUp } = this.props;
    if (
      userName.current.getText()
      && email.current.getText()
      && password.current.getText()
    ) {
      const data = {
        first_name: userName.current.getText(),
        last_name: ' ',
        email: email.current.getText(),
      };
      if (!isEdit) {
        data.password = password.current.getText();
      }

      if (isEdit) {
        editUser(data);
      } else {
        signUp(data);
      }
    }
  };

  onChangeValue = key => data => {
    this.setState({ [key]: data });
  };

  onPressTerms = () => {};

  onPressPrivacy = () => {};

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

  renderInput = () => {
    return (
      <View style={styles.vInput}>
        <Input
          icon="user"
          ref={this.userName}
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField('email')}
          placeholder={I18n.t('userInfo.username')}
        />
        <Divider style={styles.divider} />
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
          returnKeyType="done"
          onSubmitEditing={this.signUp}
          placeholder={I18n.t('userInfo.password.title')}
        />
      </View>
    );
  };

  renderButtonView = () => {
    const { isEdit } = this.props;
    return (
      <View style={styles.vButton}>
        <Button
          secondary
          style={styles.button}
          onPress={this.submitData}
          buttonTitle={
            isEdit
              ? I18n.t('button.save')
              : I18n.t('button.signUp').toLocaleUpperCase()
          }
        />
        {!isEdit && (
          <Text
            type="body3"
            color={Colors.primaryText}
            center
            style={styles.termsAndPrivacy}
          >
            {I18n.t('auth.termsAndPrivacy')}
            <Text
              type="body3SemiBold"
              onPress={this.onPressTerms}
              color={Colors.primaryText}
            >
              {I18n.t('auth.terms')}
            </Text>
            {' '}
            {I18n.t('auth.and')}
            {' '}
            <Text
              type="body3SemiBold"
              onPress={this.onPressPrivacy}
              color={Colors.primaryText}
            >
              {I18n.t('auth.privacy')}
            </Text>
            {' '}
          </Text>
        )}
        {!isEdit && (
          <View style={styles.row}>
            <Divider />
            <Text style={styles.txtOr} type="body3SemiBold">
              {I18n.t('text.or')}
            </Text>
            <Divider />
          </View>
        )}
        {!isEdit && (
          <View style={styles.vSocialButton}>
            <FacebookButton onPress={this.facebookSignIn} />
            <GoogleButton onPress={this.googleSignIn} />
          </View>
        )}
      </View>
    );
  };

  renderHeader = () => {
    const { avatar } = this.state;
    return (
      <Avatar
        style={styles.avatar}
        image={avatar || null}
        setImage={data => this.onChangeValue('avatar', true)(data.uri)}
        circle
      />
    );
  };

  render() {
    const { isEdit } = this.props;
    return (
      <Container>
        <KeyboardAwareScrollView>
          {isEdit && this.renderHeader()}
          {this.renderInput()}
          {this.renderButtonView()}
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

SignUp.propTypes = {
  isEdit: PropTypes.bool,
  editUser: PropTypes.func,
  signUp: PropTypes.func,
  componentId: PropTypes.string,
  fbSignIn: PropTypes.func,
  googleLogin: PropTypes.func,
  isFromSignIn: PropTypes.bool,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  vInput: {
    marginTop: 30,
    backgroundColor: Colors.default,
  },
  vButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width - 30,
    marginTop: 30,
  },
  termsAndPrivacy: {
    marginTop: 20,
    marginBottom: 24,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightDivider,
    marginLeft: 15,
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
  avatar: {
    marginTop: 20,
  },
});

function mapStateToProps(state) {
  return {
    user: state.login.data,
    token: state.login.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => dispatch(LoginActions.signUp(data)),
    editUser: data => dispatch(LoginActions.editUser(data)),
    fbSignIn: () => dispatch(LoginActions.fbSignIn()),
    googleLogin: () => dispatch(LoginActions.googleLogin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
