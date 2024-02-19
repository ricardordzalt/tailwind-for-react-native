import {flexDirectionProperties} from './flexDirection';
import {flexWrapProperties} from './flexWrap';
import {flexJustifyContentProperties} from './justifyContent';
import {flexAlignItemsProperties} from './flexAlignItems';
import {flexAlignContentProperties} from './flexAlignContent';
import {flexAlignSelfProperties} from './flexAlignSelf';

const flexStyles = {
  ...flexDirectionProperties,
  ...flexWrapProperties,
  ...flexJustifyContentProperties,
  ...flexAlignItemsProperties,
  ...flexAlignContentProperties,
  ...flexAlignSelfProperties,
};

export {flexStyles};
