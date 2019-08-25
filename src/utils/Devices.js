// import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export const safeArea = () => {
  // DeviceInfo.getDeviceName()
  //   .toUpperCase()
  //   .search('IPHONE X') > -1
  // if (DeviceInfo.hasNotch()) {
  //   return {
  //     marginTop: 35,
  //     marginBottom: 30,
  //     paddingBottom: 30,
  //     bottom: 30,
  //     height: 130,
  //     bottomHeight: 20,
  //     navHeight: 86,
  //   };
  // }
  if (Platform.OS === 'android') {
    return {
      marginTop: 25,
      marginBottom: 20,
      paddingBottom: 20,
      bottom: 15,
      height: 120,
      bottomHeight: 20,
      navHeight: 56,
    };
  }
  return {
    marginTop: 20,
    marginBottom: 20,
    bottom: 20,
    paddingBottom: 20,
    height: 120,
    bottomHeight: 0,
    navHeight: 64,
  };
};
