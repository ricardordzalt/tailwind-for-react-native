import {useTWRNContext} from '../providers/tw-rn-provider';
import {styleProperties as STYLES} from '../styles';
import getFilteredArrayOfStyleStringsByPlatform from '../utils/get-filtered-array-of-style-strings-by-platform';
import stylesSeparator from '../utils/styles-separator';
import {TailwindStylesGeneratorType, StylesType} from './use-tw.d';

const useTW = (): TailwindStylesGeneratorType => {
  const {styles: contextStyles} = useTWRNContext();
  console.log({contextStyles});
  const allStyles = {
    ...STYLES,
    ...contextStyles,
  };
  const tw: TailwindStylesGeneratorType = (stylesString: StylesType) => {
    const arrayOfStyleString = stylesSeparator(stylesString);
    const filteredArrayOfStyleStringsByPlatform =
      getFilteredArrayOfStyleStringsByPlatform(arrayOfStyleString);
  };
  return {tw};
};

export default useTW;
