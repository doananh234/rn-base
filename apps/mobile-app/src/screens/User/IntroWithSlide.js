import React, {
 Component,
} from 'react';
import {
 View, StyleSheet, Dimensions, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
 connect,
} from 'react-redux';
import I18n from 'i18n-js';
import {
 Colors, Images,
} from '../../themes';
import Button from '../../ui/Button';
import Text from '../../ui/Text';
// import { push, startWithTabs } from '../../navigation/navigationActions';
import CheckUpdate from '../Home/CheckUpdate';
import SwipperView from '../../ui/SwipperView';
import {
 safeArea,
} from '../../utils/Devices';

class IntroWithSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
    this.password = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  onPressSkip = () => {
    // startWithTabs();
  };

  signIn = () => {
    const { componentId } = this.props;
    // push(componentId, 'SignIn', {
    //   title: I18n.t('signIn'),
    // });
  };

  renderIntro = data => (
    <View key={data} style={styles.vIntro}>
      <Image style={styles.introImg} source={Images[`intro${data}`]} />
      <View style={styles.vContent}>
        <Text type="title1" color={Colors.primary} center>
          {I18n.t(`intro.introTitle${data}`)}
        </Text>
        <Text type="body1" color={Colors.secondaryText} center style={styles.txtIntroDes}>
          {I18n.t(`intro.introDes${data}`)}
        </Text>
      </View>
    </View>
  );

  renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Button
          transparent
          style={styles.btnLogin}
          textStyle={styles.txtBtn}
          onPress={this.onPressSkip}
          buttonTitle={I18n.t('button.skip').toLocaleUpperCase()}
        />
        {/* <View style={{ flex: 1 }} /> */}
        <Button
          transparent
          style={styles.btnLogin}
          onPress={this.signIn}
          textStyle={styles.txtBtn}
          buttonTitle={I18n.t('signIn').toLocaleUpperCase()}
        />
      </View>
    );
  };

  render() {
    const INTROS = [1, 2, 3, 4];

    return (
      <View style={styles.container}>
        <CheckUpdate />
        <View style={styles.container}>
          <SwipperView autoScroll>{INTROS.map(data => this.renderIntro(data))}</SwipperView>
        </View>
        {this.renderButtonGroup()}
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width,
  },
  vButtonGroup: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    flexDirection: 'row',
    position: 'absolute',
    bottom: safeArea().paddingBottom,
    left: 0,
    right: 0,
    height: 40,
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
});

IntroWithSlide.propTypes = {
  // signIn: PropTypes.func,
  componentId: PropTypes.string,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntroWithSlide);
