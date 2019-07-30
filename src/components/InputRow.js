/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Animated,
  Platform,
  Text,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes/index';
import { type } from '../themes/Fonts';
import tools from '../utils/tools';

export default class InputRow extends Component {
  constructor(props) {
    super(props);
    const { placeholderTextColor, value, defaultValue } = props;
    this.state = {
      isValidate: true,
      value: value || defaultValue || '',
      placeholderTextColor: placeholderTextColor || Colors.placeholderText,
      bounceValue: new Animated.Value(0),
    };
    this.input = React.createRef();
    this.containerInput = React.createRef();
  }

  componentDidMount() {
    const { defaultValue, value } = this.props;
    if (defaultValue || value) {
      this.input.current._lastNativeText = defaultValue || value;
      this.transformOnFocus();
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (`${prevProps.value}` !== `${value}`) {
      this.setValue(typeof value === 'number' ? `${value}` : value || '');
    }
  }

  onFocus = () => {
    const { textColor, onFocus } = this.props;
    this.setState({
      placeholderTextColor: textColor || Colors.primary,
      isFocus: true,
    });
    this.transformOnFocus();
    onFocus && onFocus();
  };

  onBlur = () => {
    const { validateType, onBlur, placeholderTextColor } = this.props;
    onBlur && onBlur();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const isValidate = validate(
      validateType,
      this.input.current._lastNativeText,
    );
    this.setState({ isValidate });
    if (
      !this.input.current._lastNativeText ||
      this.input.current._lastNativeText === ''
    ) {
      this.setState({
        isValidate,
        placeholderTextColor: placeholderTextColor || Colors.divider,
        isFocus: false,
      });
      this.transformOnFocus(false);
    }
  };

  setValue = text => {
    const { onChangeText } = this.props;
    this.setState({ value: text });
    this.input.current._lastNativeText = text;
    this.input.current.setNativeProps({ text });
    this.transformOnFocus();
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

  transformOnFocus = (mode = true) => {
    const { bounceValue } = this.state;
    Animated.spring(bounceValue, {
      toValue: mode ? 1 : 0,
    }).start();
  };

  renderIcon = () => {
    const { multiline, icon, placeholderTextColor } = this.props;
    return (
      <View
        style={multiline ? styles.containerLeftMultil : styles.containerLeft}
      >
        <Icon
          name={icon}
          size={25}
          style={[
            styles.icon,
            { color: placeholderTextColor || Colors.divider },
          ]}
        />
      </View>
    );
  };

  renderTextInput = () => {
    const { textInputBackgroundStyle, animatedTitle } = this.props;
    return (
      <View
        style={[styles.containerRight, { paddingTop: animatedTitle ? 20 : 0 }]}
      >
        {textInputBackgroundStyle && (
          <View
            style={[styles.textInputBackground, textInputBackgroundStyle]}
          />
        )}
        {animatedTitle && this.renderAnimatedTitle()}
        {this.renderInput()}
      </View>
    );
  };

  renderAnimatedTitle = () => {
    const { bounceValue, isFocus } = this.state;
    const { icon, placeholder, required } = this.props;
    const color = bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.placeholderText, Colors.primaryText],
    });
    const placeholderTranslateY = bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [5, -20],
    });
    const placeholderTranslateX = bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, icon ? -38 : 0],
    });
    const scaleText = bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    });

    return (
      <View>
        <Animated.Text
          style={[
            styles.placeholder,
            {
              color,
              transform: [
                { translateY: placeholderTranslateY },
                { translateX: placeholderTranslateX },
              ],
              fontSize: scaleText,
              fontWeight: isFocus ? '600' : '400',
            },
          ]}
        >
          {placeholder}
          {required && <Text style={[{ color: 'red' }]}> *</Text>}
        </Animated.Text>
      </View>
    );
  };

  renderInput() {
    const {
      validateType,
      multiline,
      onChangeText,
      returnKeyType,
      keyboardType,
      onSubmitEditing,
      editable,
      secureTextEntry,
      animatedTitle,
      placeholder,
      textColor,
      textAlign,
      textInputStyle,
      defaultValue,
    } = this.props;
    const { placeholderTextColor, isValidate, value } = this.state;
    return (
      <View>
        <TextInput
          onChangeText={text => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            const _isValidate = validate(validateType, text);
            !isValidate &&
              _isValidate &&
              this.setState({ isValidate: _isValidate });
            if (checkTypeNumber(keyboardType)) {
              if (text === '' || !text) return;
              if (checkPhoneType(keyboardType)) {
                !checkPhone(text) && this.setState({ isValidate, value });
                return;
              }
              !checkNumber(text) && this.setState({ isValidate, value });
            }
          }}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType || 'done'}
          keyboardType={keyboardType}
          blurOnSubmit={!multiline}
          underlineColorAndroid="transparent"
          multiline={multiline}
          editable={editable}
          secureTextEntry={secureTextEntry}
          ref={this.input}
          placeholder={animatedTitle ? '' : placeholder}
          placeholderTextColor={placeholderTextColor}
          selectTextOnFocus
          style={[
            styles.textInput,
            {
              color: textColor || Colors.primaryTextBlur,
              textAlign: textAlign === 'center' ? 'center' : null,
            },
            multiline ? { height: 100, marginVertical: 10 } : {},
            textInputStyle,
          ]}
          value={value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          defaultValue={defaultValue}
          onChange={event => {
            this.setState({ value: event.nativeEvent.text });
            onChangeText && onChangeText(event.nativeEvent.text);
          }}
        />
      </View>
    );
  }

  renderUnderLine = () => {
    const { placeholderTextColor, bounceValue } = this.state;
    return (
      <View>
        <View
          style={[
            styles.separatorRow,
            { top: 1.5, backgroundColor: placeholderTextColor },
          ]}
        />
        {false && (
          <Animated.View
            style={[
              styles.separatorRow,
              {
                height: 2,
                transform: [{ scaleX: bounceValue }],
                backgroundColor: Colors.primary,
              },
            ]}
          />
        )}
      </View>
    );
  };

  render() {
    const {
      validateMessage,
      underLine,
      children,
      icon,
      style,
      backgroundColor,
    } = this.props;
    const { isValidate } = this.state;
    return (
      <View ref={this.containerInput} style={[styles.item, style]}>
        <View style={[styles.containerInputRow, { backgroundColor }]}>
          {icon && this.renderIcon()}
          {this.renderTextInput()}
          {children}
        </View>
        {underLine && this.renderUnderLine()}
        {!isValidate && (
          <Text type="note" color={Colors.red} style={styles.txtError}>
            {validateMessage}
          </Text>
        )}
      </View>
    );
  }
}

InputRow.propTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  returnKeyType: PropTypes.string,
  validateMessage: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
  backgroundColor: PropTypes.string,
  underLine: PropTypes.bool,
  onChangeText: PropTypes.func,
  multiline: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
  textColor: PropTypes.string,
  onFocus: PropTypes.func,
  validateType: PropTypes.string,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  textInputBackgroundStyle: PropTypes.any,
  animatedTitle: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  keyboardType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  editable: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  textAlign: PropTypes.string,
  textInputStyle: PropTypes.any,
};

const styles = {
  containerInputRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  item: {
    marginTop: 15,
  },
  containerLeft: {
    width: 38,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  containerLeftMultil: {
    width: 38,
    paddingTop: 3,
    alignItems: 'center',
  },
  containerRight: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    color: Colors.divider,
  },
  textInput: {
    height: 35,
    paddingBottom: 5,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
    fontFamily: type.text,
    fontSize: 14,
  },
  separatorRow: {
    height: 1.5,
    backgroundColor: Colors.divider,
  },
  placeholder: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    fontFamily: type.text,
    fontSize: 12,
  },
  textInputBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
    bottom: Platform.OS === 'android' ? 0 : 5,
  },
  txtError: {
    color: Colors.red,
    marginTop: 8,
    textAlign: 'left',
  },
};
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
    e === 'numeric' ||
    e === 'phone-pad' ||
    e === 'number-pad' ||
    e === 'decimal-pad'
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
