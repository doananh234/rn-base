import React from 'react';
import { ViewPropTypes, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { PopupView } from '../PopupView';

const LoadingBlocker = props => {
    const { style, overlayColor, overlayAlpha, children, isLoading } = props;

    const renderIndicator = () => {
        if (!children || children.length === 0) {
            return <ActivityIndicator animating size="large" color="white" />;
        }
        return children;
    };

    return (
        <PopupView
            contentStyle={style}
            overlayColor={overlayColor}
            overlayAlpha={overlayAlpha}
            overlayTouchDimiss={false}
            isOpen={isLoading}
            animatorName="zoom"
        >
            {renderIndicator()}
        </PopupView>
    );
};

LoadingBlocker.propTypes = {
    isLoading: PropTypes.bool,
    overlayColor: PropTypes.string,
    overlayAlpha: PropTypes.number,
    style: ViewPropTypes.style,
    children: PropTypes.node
};
LoadingBlocker.defaultProps = {
    overlayColor: 'transparent',
    overlayAlpha: 0.7,
    isLoading: false,
    style: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    children: null
};

export { LoadingBlocker };
