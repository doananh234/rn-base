import React, {
 useState,
} from 'react';
import {
 View, StyleSheet, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {
 useDispatch,
} from 'react-redux';
import I18n from 'i18n-js';
import {
 useNavigation,
} from 'react-navigation-hooks';
import {
 Colors,
} from '../../themes';
import Button from '../../ui/Button';
import {
 FacebookButton, GoogleButton,
} from '../../ui/SocialButton';
import Text from '../../ui/Text';
// import { push, startWithTabs } from '../../navigation/navigationActions';
import CheckUpdate from '../Home/CheckUpdate';
import {
 safeArea,
} from '../../utils/Devices';
import BackgroundImage from '../../ui/BackgroundImage';
import LoginActions from '../../redux/LoginRedux/actions';
// import { signUp, login } from '../../navigation/navigationButtons';

const Intro = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { push } = useNavigation();

  onChange = name => text => {
    data[name] = text;
  };

  signUp = () => {
    push('Signup');
    // push(componentId, 'Signup', {
    //   title: I18n.t('intro.signUp'),
    //   rightButtons: [login()],
    // });
  };

  skip = () => {
    dispatch(LoginActions.skipLogin());
    // startWithTabs();
  };

  signIn = () => {
    push('SignIn');
    // push(componentId, 'SignIn', {
    //   title: I18n.t('SignIn'),
    //   rightButtons: [signUp()],
    // });
  };

  facebookSignIn = () => {
    dispatch(LoginActions.fbSignIn());
  };

  googleSignIn = () => {
    dispatch(LoginActions.googleLogin());
  };

  return (
    <View style={styles.container}>
      <CheckUpdate />
      <BackgroundImage imageName="backgroundIntro" />
      <View style={styles.vButtonGroup}>
        <Button
          secondary
          style={styles.btnLogin}
          onPress={signUp}
          buttonTitle={I18n.t('intro.signUp')}
        />
        {/* <View style={{ flex: 1 }} /> */}
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
    </View>
  );
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
  componentId: PropTypes.string,
};

export default Intro;
