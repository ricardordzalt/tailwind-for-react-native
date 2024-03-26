import {TextAlignProperties, textAlignProperties} from './textAlign';
import {TextDecorationLineProperties, textDecorationLineProperties} from './textDecorationLine';

export type TextStyles = TextAlignProperties & TextDecorationLineProperties;

const textStyles: TextStyles = {
  ...textAlignProperties,
  ...textDecorationLineProperties,
};

export {textStyles};
