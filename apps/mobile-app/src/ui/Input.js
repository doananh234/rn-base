import React, {
 Component,
} from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import {
 View, StyleSheet, TextInput,
} from 'react-native';
import MealPlanner from 'react-native-vector-icons/mealplanner';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
 Colors,
} from '../themes';
import tools from '../utils/tools';
import Text from './Text';

export default class Input extends Component {
  constructor(props) {
    super(props);
    const { value, defaultValue } = props;
    this.state = {
      isValidate: true,
      value: value || defaultValue || '',
      isShowPass: !props.secureTextEntry,
    };
    this.input = React.createRef();
  }

  componentDidMount() {
    const { defaultValue, value } = this.props;
    if (defaultValue || value) {
      this.input.current._lastNativeText = defaultValue || value;
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (`${prevProps.value}` !== `${value}`) {
      this.setValue(typeof value === 'number' ? `${value}` : value || '');
    }
  }

  onFocus = () => {
    const { onFocus } = this.props;
    onFocus && onFocus();
  };

  onBlur = () => {
    const { validateType, onBlur } = this.props;
    onBlur && onBlur();
    const isValidate = validate(
      validateType,
      this.input.current._lastNativeText,
    );
    this.setState({ isValidate });
    if (
      !this.input.current._lastNativeText
      || this.input.current._lastNativeText === ''
    ) {
      this.setState({ isValidate });
    }
  };

  setValue = text => {
    const { onChangeText } = this.props;
    this.setState({ value: text });
    this.input.current._lastNativeText = text;
    this.input.current.setNativeProps({ text });
    onChangeText && onChangeText(text);
  };

  getText = () => {
    const { isValidate } = this.state;
    return isValidate ? this.input.current._lastNativeText : null;
  };

  focus = () => {
    this.input.current.focus();
  };

  blur = () => {
    this.input.current.blur();
  };

  onChangeText = text => {
    const { validateType, keyboardType } = this.props;
    const { isValidate, value } = this.state;
    const _isValidate = validate(validateType, text);
    isValidate !== _isValidate && this.setState({ isValidate: _isValidate });
    if (checkTypeNumber(keyboardType)) {
      if (text === '' || !text) return;
      if (checkPhoneType(keyboardType)) {
        !checkPhone(text) && this.setState({ isValidate, value });
        return;
      }
      !checkNumber(text) && this.setState({ isValidate, value });
    }
  };

  toggleShowPass = () => {
    const { isShowPass } = this.state;
    this.setState({ isShowPass: !isShowPass });
  };

  render() {
    const {
      onChangeText,
      returnKeyType,
      keyboardType,
      onSubmitEditing,
      secureTextEntry,
      placeholder,
      defaultValue,
      icon,
      style,
      errorText,
    } = this.props;
    const { value, isShowPass, isValidate } = this.state;
    return (
      <View>
        <View style={[styles.container, style]}>
          <MealPlanner name={icon} style={styles.icon} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.onChangeText}
            style={styles.input}
            spellCheck={false}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType || 'done'}
            keyboardType={keyboardType}
            underlineColorAndroid="transparent"
            secureTextEntry={!isShowPass}
            ref={this.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.secondaryText}
            selectTextOnFocus
            value={value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            defaultValue={defaultValue}
            onChange={({ nativeEvent: { text } }) => {
              this.setState({ value: text });
              onChangeText && onChangeText(text);
            }}
          />
          {secureTextEntry && (
            <FontAwesome5
              onPress={this.toggleShowPass}
              name={isShowPass ? 'eye-slash' : 'eye'}
              style={styles.icon}
            />
          )}
        </View>
        {!isValidate && errorText && (
          <Text type="small" color={Colors.red} style={styles.errorText}>
            {errorText || I18n.t('error.formatError')}
          </Text>
        )}
      </View>
    );
  }
}

Input.propTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  returnKeyType: PropTypes.string,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  validateType: PropTypes.string,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.any,
  errorText: PropTypes.string,
};

Input.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    flex: 1,
    fontSize: 17,
  },
  icon: {
    color: Colors.secondaryText,
    width: 35,
    fontSize: 17,
    marginLeft: 15,
  },
  errorText: {
    position: 'absolute',
    bottom: 3,
    left: 50,
  },
});

const checkPhone = num => {
  const re = /^[0-9#+*.,]+$/;
  return re.test(num);
};
const checkPhoneType = e => {
  return e === 'phone-pad';
};

const checkNumber = num => {
  const re = /^[-+]?[0-9]*\.?[0-9]?[0-9]?$/;
  const re1 = /^[-+]?[0-9]*\,?[0-9]?[0-9]?$/;
  return re.test(num) || re1.test(num);
};

const checkTypeNumber = e => {
  return (
    e === 'numeric'
    || e === 'phone-pad'
    || e === 'number-pad'
    || e === 'decimal-pad'
  );
};

const validate = (e, text) => {
  switch (e) {
    case 'email':
      return tools.validateEmail(text);
    case 'password':
      return text && text.length > 5;
    case 'phone':
      return checkPhone(text);
    case 'number':
      return checkNumber(text);
    default:
      return true;
  }
};
