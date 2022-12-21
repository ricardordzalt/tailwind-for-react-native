import {getStylesFromArraysOfstyleStringType} from './get-styles-from-arrays-of-style-string.d';
import {Platform} from 'react-native';
import {styleProperties as STYLES} from '../styles';
import getStyleFromStyleString from './get-style-from-style-string';

const getStylesFromArraysOfstyleString = ({
  arrayOfStyleString,
  window,
  colors,
  contextStyles,
}: getStylesFromArraysOfstyleStringType) => {
  const allStyles = {
    ...STYLES,
    ...contextStyles,
  };
  if (!arrayOfStyleString) {
    return;
  }
  let styles = {};
  for (let i = 0; i < arrayOfStyleString.length; i++) {
    let styleString = arrayOfStyleString[i];
    const specifiesPlatform =
      styleString.startsWith('android:') || styleString.startsWith('ios:');
    const matchPlatform = specifiesPlatform
      ? (styleString.startsWith('android:') && Platform.OS === 'android') ||
        (styleString.startsWith('ios:') && Platform.OS === 'ios')
      : true;
    if (matchPlatform) {
      styleString = styleString.replace('ios:', '').replace('android:', '');
    }
    if (!matchPlatform) {
    } else if (allStyles[styleString]) {
      styles = {
        ...styles,
        ...allStyles[styleString],
      };
    } else {
      styles = {
        ...styles,
        ...getStyleFromStyleString({styleString, window, colors}),
      };
    }
  }
  return styles;
};

export default getStylesFromArraysOfstyleString;
