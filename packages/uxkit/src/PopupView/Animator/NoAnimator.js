import { Animated, Easing } from 'react-native';

const animationDirector = () => [];

const dismissAnimation = (animationContext, finished) => {
    if (finished) {
        finished();
    }
};

const presentAnimation = (animationContext, finished) => {
    if (finished) {
        finished();
    }
};

export default {
    name: 'none',
    animationDirector,
    dismissAnimation,
    presentAnimation
};
