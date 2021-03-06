import { Animated, Easing } from 'react-native';

const animationDirector = animationContext => {
    const scale = animationContext.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });
    const opacity = animationContext.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });
    return [{ opacity }, { transform: [{ scale }] }];
};

const dismissAnimation = (animationContext, finished) => {
    Animated.timing(animationContext.animatedValue, {
        toValue: 0,
        duration: animationContext.dismissAnimatedDuration,
        easing: Easing.linear,
        useNativeDriver: true
    }).start(() => {
        if (finished) {
            finished();
        }
    });
};

const presentAnimation = (animationContext, finished) => {
    Animated.spring(animationContext.animatedValue, {
        toValue: 1,
        duration: animationContext.presentAnimatedDuration,
        friction: 5,
        useNativeDriver: true
    }).start(() => {
        if (finished) {
            finished();
        }
    });
};

export default {
    name: 'zoom',
    animationDirector,
    dismissAnimation,
    presentAnimation
};
