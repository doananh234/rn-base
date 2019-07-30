import React, { PureComponent } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Animated, View } from 'react-native';
import { Colors } from '../../themes';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const animation = new Animated.Value(0);
let isStarted = false;
const spin = () => {
  animation.setValue(0);
  Animated.sequence([
    Animated.delay(100),
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
    }),
  ]).start(() => {
    isStarted && spin();
  });
};
const init = e => {
  if (!isStarted && e) {
    isStarted = e;
    spin();
    return;
  }
  if (isStarted && !e) {
    isStarted = e;
  }
};

const debounceInit = debounce(init, 100);

export default class LoadingItem extends PureComponent {
  componentDidMount() {
    debounceInit(true);
  }

  componentWillUnmount() {
    debounceInit(false);
  }

  render() {
    const { contentHeight, contentWidth, style } = this.props;
    const translateX2 = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, contentWidth + 100],
    });
    return (
      <View
        style={[
          styles.container,
          style,
          { height: contentHeight || 100, width: contentWidth },
        ]}
      >
        <AnimatedLinearGradient
          colors={[Colors.lightDivider, Colors.divider, Colors.lightDivider]}
          start={{ x: 0, y: 1.0 }}
          end={{ x: 0.7, y: 1 }}
          locations={[0, 0.5, 1]}
          style={[
            styles.currentProgress,
            {
              transform: [{ translateX: translateX2 }],
            },
          ]}
        />
      </View>
    );
  }
}
LoadingItem.propTypes = {
  contentHeight: PropTypes.number,
  contentWidth: PropTypes.number,
  style: PropTypes.any,
};

LoadingItem.defaultProps = {
  contentHeight: 50,
  contentWidth: 100,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightDivider,
    overflow: 'hidden',
  },
  currentProgress: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    width: 100,
  },
});
