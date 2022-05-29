import { Dimensions, StatusBar } from 'react-native';
  
const { width, height } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight * 2;
import useFont from '../useFont';

const LoadFont = async () => {
  await useFont();
}

LoadFont();

export const COLORS = {
  //base colors
  white: "#fff",
  black: "#000",
  //global colors
  blue: "blue"
};

export const SIZES = {
  //base sizes
  base: 14,
  font: 14,
  padding: 24,
  margin: 24,
  radius: 12,
  //global size
  largeTitle: 50,
  h1: 32,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 32,
  body2 : 22,
  body3: 16,
  body4: 14,
  //Dimension
  statusBarHeight,
  width,
  height
};

export const FONTS = {
  vndi01: {
    fontFamily: 'vndi01',
  },
  vndi02: {
    fontFamily: 'vndi02'
  },
  Roboto_Black: {
    fontFamily: 'Roboto_Black'
  },
  Roboto_BlackItalic: {
    fontFamily: 'Roboto_BlackItalic'
  },
  Roboto_Bold: {
    fontFamily: 'Roboto_Bold'
  },
  Roboto_BoldItalic: {
    fontFamily: 'Roboto_BoldItalic'
  },
  Pacifico: {
    fontFamily: 'Pacifico'
  }
}

const theme = {
  FONTS,
  COLORS,
  SIZES
};

export default theme;

