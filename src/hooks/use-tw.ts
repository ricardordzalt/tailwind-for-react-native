import {Platform, useWindowDimensions} from 'react-native';
import {COLORS} from '../constants/colors';
import {useTWRNContext} from '../providers/tw-rn-provider';
import {styleProperties as STYLES} from '../styles';
import getFilteredArrayOfStyleStringsByPlatform from '../utils/get-filtered-array-of-style-strings-by-platform';
import getFilteredArrayOfStyleStringsByMode from '../utils/get-filtered-array-of-style-strings-by-mode';
import getStyleFromStyleString from '../utils/get-style-from-style-string';
import stylesSeparator from '../utils/styles-separator';
import {TailwindStylesGeneratorType, StylesType} from './use-tw.d';

const useTW = (): any => {
  // For screen dimensions
  const window = useWindowDimensions();
  const {
    styles: contextStyles,
    colors: contextColors,
    mode,
    toggleMode,
  } = useTWRNContext();
  const allStyles = {
    ...STYLES,
    ...contextStyles,
  };

  const allColors = {
    ...COLORS,
    ...contextColors,
  };

  const tw: TailwindStylesGeneratorType = (stylesString: StylesType) => {
    const arrayOfStyleString = stylesSeparator(stylesString);
    const filteredArrayOfStyleStringsByPlatform =
      getFilteredArrayOfStyleStringsByPlatform(arrayOfStyleString, Platform.OS);
    const filteredArrayOfStyleStringsByMode =
      getFilteredArrayOfStyleStringsByMode(
        filteredArrayOfStyleStringsByPlatform,
        mode,
      );
    let styles = {};
    const styleStringsLength = filteredArrayOfStyleStringsByMode?.length;
    for (let i = 0; i < styleStringsLength; i++) {
      const currentStyleString = filteredArrayOfStyleStringsByMode[i];
      if (allStyles[currentStyleString]) {
        styles = {
          ...styles,
          ...allStyles[currentStyleString],
        };
      } else {
        const style = getStyleFromStyleString({
          styleString: currentStyleString,
          window,
          colors: allColors,
        });
        styles = {
          ...styles,
          ...style,
        };
      }
    }
    return styles;
  };
  return {
    tw,
    mode,
    toggleMode,
    colors: contextColors,
  };
};

export default useTW;
