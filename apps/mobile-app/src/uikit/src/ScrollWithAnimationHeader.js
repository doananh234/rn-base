import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Images, Colors } from 'themes';
import { safeArea } from 'utils/Devices';
import Text from './Text';

const AnimationFastImage = Animated.createAnimatedComponent(FastImage);

const ScrollWithAnimationHeader = ({
  title,
  style,
  children,
  image,
  heightImage,
}) => {
  const [scrollY] = useState(new Animated.Value(-safeArea().navHeight));
  const transform = scrollY
    ? [
        {
          translateY: scrollY.interpolate({
            inputRange: [-heightImage, -20, 0, 20, heightImage],
            outputRange: [heightImage / 2, 0, 0, 0, -heightImage / 3],
          }),
        },
        {
          scale: scrollY.interpolate({
            inputRange: [-heightImage, -20, 0, 20, heightImage],
            outputRange: [2, 1, 1, 1, 1],
          }),
        },
      ]
    : [];

  const opacity = scrollY.interpolate({
    inputRange: [-heightImage, -20, 0, 20, heightImage],
    outputRange: [0, 0, 0, 0, 1],
  });

  return (
    <View style={[styles.container, style]}>
      <AnimationFastImage
        source={image ? { uri: image } : Images.test}
        style={[
          styles.imageBackground,
          { height: heightImage + 40 },
          { transform },
        ]}
      />
      <Animated.ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
        scrollEventThrottle={16}
        style={styles.container}
        contentContainerStyle={{ paddingTop: heightImage - 44 }}
      >
        {children}
      </Animated.ScrollView>
      <Animated.View style={[styles.headerTitle, { opacity }]}>
        <Text color={Colors.primaryText} title="headlineBold">
          {title}
        </Text>
      </Animated.View>
    </View>
  );
};

const { height, width } = Dimensions.get('screen');

ScrollWithAnimationHeader.propTypes = {
  children: PropTypes.any,
  heightImage: PropTypes.number,
  image: PropTypes.string,
  style: PropTypes.any,
  title: PropTypes.string,
};

ScrollWithAnimationHeader.defaultProps = {
  heightImage: height / 3,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  imageBackground: {
    width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: Colors.primaryTextDark,
  },
  headerTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: safeArea().navHeight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: safeArea().statusBar,
  },
});

export default ScrollWithAnimationHeader;
