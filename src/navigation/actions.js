import { NavigationActions, StackActions } from 'react-navigation';

// TODO: Stack Actions
/**
 * The push action adds a route on top of the stack and navigates forward to it.
 * This differs from navigate in that navigate will pop back to earlier in the stack
 * if a route of the given name is already present there. push will always add on top,
 * so a route can be present multiple times.
 * @param {*} navigation - navigation get from props
 * @param {*} routeName - routeName to push onto the stack.
 * @param {*} params - Screen params to merge into the destination route
 * (found in the pushed screen through this.props.navigation.state.params
 * or in useNavigationParam hook).
 */
export const push = (navigation, routeName, params) => {
    navigation.dispatch(StackActions.push({
        routeName,
        params,
    }));
};

/**
 * The pop action takes you back to a previous screen in the stack.
 * @param {object} navigation - navigation get from props
 * @param {number} number - The number of screens to pop back by.
 */
export const pop = (navigation, number = 1) => {
    navigation.dispatch(StackActions.pop({
        n: number,
    }));
};


/**
 * The popToTop action takes you back to the first screen in the stack, dismissing all the others.
 * It's functionally identical to StackActions.pop({n: currentIndex}).
 * @param {object} navigation - navigation get from props
 */
export const popToTop = navigation => {
    navigation.dispatch(StackActions.popToTop());
};


// TODO: Navigation Actions
/**
 * The navigate action will update the current state with the result of a navigate action.
 * @param {object} navigation - navigation get from props
 * @param {string} routeName - String - Required - A destination routeName
 * that has been registered somewhere in the app's router
 * @param {object} params - Object - Optional - Params to merge into the destination route
 * @param {object=} action - Object - Optional - (advanced) The sub-action to run in the
 * child router,if the screen is a navigator.
 * Any one of the actions described in this doc can be set as a sub-action.
 * @param {object=} key - String - Optional - The identifier for the route to navigate to.
 * Navigate back to this route if it already exists
 */
export const navigate = (navigation, routeName, params, action, key) => {
    navigation.dispatch(NavigationActions.navigate({
        routeName,
        params,
        action,
        key,
    }));
};

/**
 * Go back to previous screen and close current screen.
 * back action creator takes in one optional parameter:
 * @param {string} key string or null - optional - If set,
 * navigation will go back from the given key. If null, navigation will go back anywhere.
 */
export const back = (navigation, key) => {
    navigation.dispatch(NavigationActions.setParams({
        params,
        key,
    }));
};

/**
 * When dispatching setParams, the router will produce a new state that has changed
 * the params of a particular route, as identified by the key
 * @param {*} navigation
 * @param {*} params - object - required - New params to be merged into existing route params
 * @param {*} key - string - required - Route key that should get the new params
 */
export const setParams = (navigation, params, key) => {
    navigation.dispatch(NavigationActions.setParams({
        params,
        key,
    }));
};
