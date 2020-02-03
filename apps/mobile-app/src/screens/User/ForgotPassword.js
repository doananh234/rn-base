import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'i18n-js';
import {bindActionCreators} from 'redux';
import InputRow from 'uikit/src/InputRow';
import Button from 'uikit/src/Button';
import Text from 'uikit/src/Text';
import Container from 'uikit/src/Container';
import Input from 'uikit/src/Input';
import {Colors} from 'themes';
import Actions from '@redux/ForgotPasswordRedux/actions';

class ForgotPassword extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  send = () => {
    const {forgotPassword} = this.props;
    if (this.email.current.getText()) {
      const data = {
        email: this.email.current.getText(),
      };
      forgotPassword(data);
    }
  };

  renderDescription = () => {
    return (
      <View style={styles.description}>
        <Text type="body2" color={Colors.primaryText}>
          {I18n.t('userInfo.password.forgotPasswordCaption')}
        </Text>
        <Text type="body3" color={Colors.primaryTextBlur}>
          {I18n.t('userInfo.password.forgotPasswordDescription')}
        </Text>
      </View>
    );
  };

  renderInput = () => (
    <View style={styles.groupInput}>
      <InputRow
        ref={ref => {
          this.email = ref;
        }}
        textColor={Colors.primary}
        animatedTitle
        underLine
        validateType="email"
        // onChangeText={this.onChange('email')}
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.email')}
      />
    </View>
  );

  render() {
    return (
      <Container>
        <Input
          icon="email"
          ref={this.email}
          validateType="email"
          returnKeyType="done"
          onSubmitEditing={this.send}
          placeholder={I18n.t('userInfo.email')}
          style={styles.input}
          errorText={I18n.t('error.email')}
        />
        <Button
          secondary
          style={styles.vBtn}
          onPress={this.send}
          buttonTitle={I18n.t('send').toLocaleUpperCase()}
        />
      </Container>
    );
  }
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  description: {
    paddingTop: 40,
  },
  input: {
    marginTop: 30,
  },
  vBtn: {
    width: width - 30,
    marginTop: 30,
    marginLeft: 15,
  },
});

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
