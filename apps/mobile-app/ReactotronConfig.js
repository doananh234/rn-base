/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
if (__DEV__) {
    const Reactotron = require('reactotron-react-native').default;

    Reactotron.configure({ host: '192.168.2.23' }) // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect(); // let's connect!
}
