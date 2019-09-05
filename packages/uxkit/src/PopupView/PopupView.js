import React, { useRef, useState, useEffect } from 'react';
import {
    ViewPropTypes,
    StyleSheet,
    View,
    Animated,
    BackAndroid as RNBackAndroid,
    BackHandler as RNBackHandler
} from 'react-native';
import PropTypes from 'prop-types';
import { OverlayView } from '../common/OverlayView';
import { registerPopupViewAnimator, getPopupViewAnimator } from './Animator/PopupViewAnimators';
//
const BackHandler = RNBackHandler || RNBackAndroid;
const HARDWARE_BACK_PRESS_EVENT = 'hardwareBackPress';
//
const PopupView = props => {
    const {
        isOpen,
        children,
        hasOverlay,
        overlayColor,
        overlayAlpha,
        style,
        contentStyle,
        overlayTouchDimiss,
        allowTouchThroughOverlay,
        didLayout,
        onCloseRequest,
        willClose,
        didClose,
        willShow,
        didShow,
        animatorName,
        requestDynamicContentStyle,
        requestCustomAnimationContext,
        presentAnimatedDuration,
        dismissAnimatedDuration,
        blockHardwareBackButton
    } = props;
    const animatedValueRef = useRef(new Animated.Value(0));
    const needPresentRef = useRef(false);
    const [isPresented, setIsPresented] = useState(false);
    const [popupContentDimension, setPopupContentDimension] = useState({ width: 0.0, height: 0.0 });
    //
    const animator = getPopupViewAnimator(animatorName);
    //
    const overlayTapped = () => {
        if (overlayTouchDimiss) {
            onCloseRequest();
        }
    };

    const handleLayoutPopupContent = e => {
        const { layout } = e.nativeEvent;
        needPresentRef.current = true;
        const popupLayout = { width: layout.width, height: layout.height };
        didLayout(popupLayout);
        //
        setPopupContentDimension(popupLayout);
    };

    const hardwareBackEventHandler = () => {
        if (!isOpen) {
            return false;
        }
        //
        if (blockHardwareBackButton && isOpen) {
            return true; // Block
        }
        //
        if (!overlayTouchDimiss && isOpen) {
            return true; // Block
        }
        //
        if (overlayTouchDimiss && isOpen) {
            onCloseRequest();
            return true; // Block
        }
        //
        return false;
    };

    const dismissAnimation = () => {
        willClose();
        animator.dismissAnimation(
            {
                animatedValue: animatedValueRef.current,
                presentAnimatedDuration,
                dismissAnimatedDuration,
                popupContentDimension
            },
            () => {
                setIsPresented(false);
                didClose();
            }
        );
    };

    const presentAnimation = () => {
        willShow();
        animator.presentAnimation(
            {
                animatedValue: animatedValueRef.current,
                presentAnimatedDuration,
                dismissAnimatedDuration,
                popupContentDimension
            },
            () => {
                didShow();
            }
        );
    };

    const animationDirector = () => animator.animationDirector({
        animatedValue: animatedValueRef.current,
        popupContentDimension,
        custom: requestCustomAnimationContext(popupContentDimension)
    });

    useEffect(() => {
        BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackEventHandler);
        return () => {
            BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT, hardwareBackEventHandler);
        };
    }, []);

    useEffect(() => {
        if (needPresentRef.current) {
            presentAnimation();
        }
    }, [popupContentDimension]);

    if (isOpen) {
        if (!isPresented) {
            setIsPresented(true);
        }
    } else if (isPresented) {
        dismissAnimation();
    }
    //
    if (isPresented) {
        return (
            <View style={[styles.container, style]} pointerEvents="box-none">
                <OverlayView
                    hasOverlay={hasOverlay}
                    overlayColor={overlayColor}
                    overlayAlpha={overlayAlpha}
                    animatedValue={animatedValueRef.current}
                    overlayTapped={overlayTapped}
                    allowTouchThrough={allowTouchThroughOverlay}
                />
                <Animated.View
                    style={[contentStyle, requestDynamicContentStyle(popupContentDimension), ...animationDirector()]}
                    onLayout={handleLayoutPopupContent}
                >
                    {children}
                </Animated.View>
            </View>
        );
    }
    return null;
};

PopupView.propTypes = {
    hasOverlay: PropTypes.bool,
    allowTouchThroughOverlay: PropTypes.bool,
    overlayColor: PropTypes.string,
    animatorName: PropTypes.string,
    overlayAlpha: PropTypes.number,
    presentAnimatedDuration: PropTypes.number,
    dismissAnimatedDuration: PropTypes.number,
    overlayTouchDimiss: PropTypes.bool,
    style: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    isOpen: PropTypes.bool.isRequired,
    blockHardwareBackButton: PropTypes.bool,
    children: PropTypes.node,
    onCloseRequest: PropTypes.func,
    requestDynamicContentStyle: PropTypes.func,
    requestCustomAnimationContext: PropTypes.func,
    didLayout: PropTypes.func,
    willClose: PropTypes.func,
    didClose: PropTypes.func,
    willShow: PropTypes.func,
    didShow: PropTypes.func
};
PopupView.defaultProps = {
    hasOverlay: true,
    allowTouchThroughOverlay: false,
    animatorName: 'default',
    overlayColor: 'grey',
    overlayAlpha: 0.7,
    presentAnimatedDuration: 500,
    dismissAnimatedDuration: 100,
    overlayTouchDimiss: true,
    blockHardwareBackButton: false,
    style: {
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    contentStyle: {},
    children: null,
    didLayout: () => {},
    requestDynamicContentStyle: () => ({}),
    requestCustomAnimationContext: () => ({}),
    onCloseRequest: () => {},
    willClose: () => {},
    didClose: () => {},
    willShow: () => {},
    didShow: () => {}
};

export { PopupView, registerPopupViewAnimator };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

        zIndex: 1000,
        elevation: 1000
    }
});
