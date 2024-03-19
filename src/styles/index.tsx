import {FontStyles, fontStyles} from './font';
import {FlexStyles, flexStyles} from './flex';
import {TextStyles, textStyles} from './text';
import {PositionStyles, positionStyles} from './position';
import {DirectionStyles, directionStyles} from './direction';
import {DisplayStyles, displayStyles} from './display';
import {OverflowStyles, overflowStyles} from './overflow';

type StyleProperties = FlexStyles &
  FontStyles &
  TextStyles &
  PositionStyles &
  DirectionStyles &
  DisplayStyles &
  OverflowStyles;

export const styleProperties: StyleProperties = {
  ...flexStyles,
  ...fontStyles,
  ...textStyles,
  ...positionStyles,
  ...directionStyles,
  ...displayStyles,
  ...overflowStyles,
};
