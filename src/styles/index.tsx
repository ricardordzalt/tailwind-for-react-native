import {fontStyles} from './font';
import {flexStyles} from './flex';
import {textStyles} from './text';
import {positionStyles} from './position';
import {directionStyles} from './direction';
import {displayStyles} from './display';
import {overflowStyles} from './overflow';

export const styleProperties: any = {
  ...flexStyles,
  ...fontStyles,
  ...textStyles,
  ...positionStyles,
  ...directionStyles,
  ...displayStyles,
  ...overflowStyles,
};
