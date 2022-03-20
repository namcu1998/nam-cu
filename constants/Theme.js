import { Dimensions, StatusBar } from 'react-native';
  
const { width, height } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight * 2;
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
  h1: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    lineHeight: 36
  },
  h2: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    lineHeight: 30
  },
  h3: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    lineHeight: 22
  },
  h4: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    lineHeight: 22
  },
  body1: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.body1,
    fontWeight: 'bold',
    lineHeight: 36
  },
  body2: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.body2,
    fontWeight: 'bold',
    lineHeight: 30
  },
  body3: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    lineHeight: 22
  },
  body4: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.body4,
    fontWeight: 'bold',
    lineHeight: 22
  }
}

const theme = {
  FONTS,
  COLORS,
  SIZES
};

export default theme;