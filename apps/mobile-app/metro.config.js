/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
// eslint-disable-next-line
// const blacklist = require('metro-config/src/defaults/blacklist');
// const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  // projectRoot: __dirname,
  // watchFolders: [
  //   path.resolve(__dirname, '../../node_modules'),
  //   path.resolve(__dirname, '../../packages'),
  // ],
  // resolver: {
  //   blacklistRE: blacklist([
  //     new RegExp(
  //       `^${escape(
  //         path.resolve(__dirname, '../..', 'apps/uikit/node_modules'),
  //       )}\\/.*$`,
  //     ),
  //   ]),
  //   extraNodeModules: new Proxy(
  //     {},
  //     {
  //       get: (target, name) => {
  //         return path.join(__dirname, `node_modules/${name}`);
  //       },
  //     },
  //   ),
  //   providesModuleNodeModules: [
  //     'react',
  //     'react-native',
  //     '@babel/runtime',
  //     'i18n-js',
  //     'react-native-vector-icons',
  //     'prop-types',
  //   ],
  // },
};
