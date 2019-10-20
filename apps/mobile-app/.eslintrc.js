module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: '@react-native-community',
  plugins: ['react-native'],
  rules: {
    'eslint-comments/no-unused-disable': 0,
    'eslint-comments/no-unlimited-disable': 0,
    'react-native/no-unused-styles': 2,
  },
};
