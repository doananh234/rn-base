import { Animated, Easing } from 'react-native';

const animationDirector = animationContext => {
    const translateY = animationContext.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [animationContext.popupContentDimension.height, 0]
    });
    const opacity = animationContext.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });
    return [{ opacity }, { transform: [{ translateY }] }];
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
    name: 'slideUp',
    animationDirector,
    dismissAnimation,
    presentAnimation
};
