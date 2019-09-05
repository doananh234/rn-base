import DefaultAnimator from './DefaultAnimator';
import ZoomAnimator from './ZoomAnimator';
import SlideUpAnimator from './SlideUpAnimator';
import SlideDownAnimator from './SlideDownAnimator';
import NoAnimator from './NoAnimator';

const animators = {};

export const registerPopupViewAnimator = animator => {
    animators[animator.name] = animator;
};

export const getPopupViewAnimator = name => {
    const animator = animators[name];
    if (!animator) {
        return defaultPopupViewAnimator();
    }
    return animator;
};

const registerDefaultPopupViewAnimator = () => {
    registerPopupViewAnimator(DefaultAnimator);
    registerPopupViewAnimator(ZoomAnimator);
    registerPopupViewAnimator(SlideUpAnimator);
    registerPopupViewAnimator(SlideDownAnimator);
    registerPopupViewAnimator(NoAnimator);
};

registerDefaultPopupViewAnimator();

export const defaultPopupViewAnimator = () => getPopupViewAnimator('default');
