import {FontWeightProperties, fontWeightProperties} from './fontWeight';
import {FontStyleProperties, fontStyleProperties} from './fontStyle';

export type FontStyles = FontWeightProperties & FontStyleProperties;

const fontStyles = {
  ...fontWeightProperties,
  ...fontStyleProperties,
};

export {fontStyles};
