import {BorderStyleProperties, borderStyleProperties} from './borderStyle';

export type BorderStyles = BorderStyleProperties;

const borderStyles: BorderStyles = {
  ...borderStyleProperties,
};

export {borderStyles};
