import React from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';

const OverlayView = props => {
    const { animatedValue, overlayTapped, hasOverlay, overlayColor, overlayAlpha, allowTouchThrough } = props;
    if (!hasOverlay) {
        return null;
    }
    //
    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, overlayAlpha]
    });
    //
    return (
        <Animated.View
            style={[styles.container, { opacity }, { backgroundColor: overlayColor }]}
            pointerEvents={allowTouchThrough ? 'none' : 'auto'}
        >
            <TouchableOpacity onPress={overlayTapped} style={styles.container} />
        </Animated.View>
    );
};

OverlayView.propTypes = {
    animatedValue: PropTypes.instanceOf(Animated.Value).isRequired,
    overlayTapped: PropTypes.func.isRequired,
    hasOverlay: PropTypes.bool,
    overlayColor: PropTypes.string,
    allowTouchThrough: PropTypes.bool,
    overlayAlpha: PropTypes.number
};
OverlayView.defaultProps = {
    allowTouchThrough: false,
    hasOverlay: true,
    overlayColor: 'grey',
    overlayAlpha: 0.7
};

export { OverlayView };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
});
