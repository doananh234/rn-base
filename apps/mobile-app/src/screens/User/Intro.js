import React from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import { push } from 'navigation/navigationActions';
import { skipLogin } from '@redux/auth/actions';
import { Colors } from 'themes';
import Button from 'uikit/src/Button';
import { FacebookButton, GoogleButton } from 'uikit/src/SocialButton';
import Text from 'uikit/src/Text';
import BackgroundImage from 'uikit/src/BackgroundImage';
import CheckUpdate from '../Home/CheckUpdate';
import { safeArea } from '../../utils/Devices';

function Intro({ componentId }) {
  const dispatch = useDispatch();

  const signUp = () => {
    push(componentId, 'SignUp');
  };

  const skip = () => {
    dispatch(skipLogin());
  };

  const signIn = () => {
    push(componentId, 'SignIn', {});
  };

  const facebookSignIn = () => {
    // const { fbSignIn } = this.props;
    // fbSignIn();
  };

  const googleSignIn = () => {
    // const { googleLogin } = this.props;
    // googleLogin();
  };

  const renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Button
          secondary
          style={styles.btnLogin}
          onPress={signUp}
          buttonTitle={I18n.t('intro.signUp')}
        />
        <Button
          transparent
          style={styles.btnSkip}
          onPress={skip}
          textStyle={styles.txtBtn}
          buttonTitle={I18n.t('button.skip')}
        />
        <Text style={styles.txtSignIn} onPress={signIn}>
          {I18n.t('intro.alreadyMember')}
          <Text type="body2Bold" color={Colors.primaryText}>
            {I18n.t('intro.signIn')}
          </Text>
        </Text>
        <View style={styles.vSocialButton}>
          <FacebookButton onPress={facebookSignIn} />
          <GoogleButton onPress={googleSignIn} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CheckUpdate />
      <BackgroundImage imageName="backgroundIntro" />
      {renderButtonGroup()}
    </View>
  );
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
  // componentId: PropTypes.string,
};

// function mapStateToProps() {
//   return {};
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fbSignIn: () => dispatch(LoginActions.fbSignIn()),
//     googleLogin: () => dispatch(LoginActions.googleLogin()),
//     skipLogin: () => dispatch(LoginActions.skipLogin()),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Intro);

export default React.memo(Intro);
