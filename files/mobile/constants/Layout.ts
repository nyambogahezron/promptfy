import { Platform, StatusBar, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Status bar height calculation
export const statusBarHeight = Platform.OS === 'android'
  ? StatusBar.currentHeight || 0
  : Platform.OS === 'ios'
    ? 44
    : 0;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};