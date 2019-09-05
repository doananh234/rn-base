import React, {
 Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import {
 Colors,
} from '../../themes';
import CloseButton from './CloseButtonForLightBox';
import {
 safeArea,
} from '../../utils/Devices';

class PopupWrapper extends Component {
  constructor(props) {
    super(props);
    this.animated = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.spring(this.animated, {
      toValue: 1,
    }).start();
  }

  onPreClose = () => {
    const { onPreClose } = this.props;
    if (onPreClose) {
      onPreClose(this.onClose);
    } else {
      this.onClose();
    }
  };

  onClose = () => {
    const { onClose } = this.props;
    Animated.timing(this.animated, {
      toValue: 0,
      duration: 100,
    }).start(() => {
      onClose();
    });
  };

  render() {
    const { contentStyle, showCloseButton, children } = this.props;
    const backgroundColor = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', Colors.blur1],
    });
    const translateY = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
    });

    return (
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
          <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
            <TouchableWithoutFeedback onPress={this.onPreClose} style={styles.overlay}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            {showCloseButton && <CloseButton onClose={this.onPreClose} />}
            <Animated.View style={[styles.content, contentStyle]}>{children}</Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    );
  }
}
PopupWrapper.propTypes = {
  children: PropTypes.any,
  contentStyle: PropTypes.any,
  showCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  onPreClose: PropTypes.func,
};

PopupWrapper.defaultProps = {
  showCloseButton: true,
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  overlay: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.default,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: safeArea().bottom,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 15,
  },
});

export default PopupWrapper;
