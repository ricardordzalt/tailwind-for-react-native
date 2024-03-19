import {
  FlexDirectionProperties,
  flexDirectionProperties,
} from './flexDirection';
import {FlexWrapProperties, flexWrapProperties} from './flexWrap';
import {
  FlexJustifyContentProperties,
  flexJustifyContentProperties,
} from './justifyContent';
import {
  FlexAlignItemsProperties,
  flexAlignItemsProperties,
} from './flexAlignItems';
import {
  FlexAlignContentProperties,
  flexAlignContentProperties,
} from './flexAlignContent';
import {
  FlexAlignSelfProperties,
  flexAlignSelfProperties,
} from './flexAlignSelf';

export type FlexStyles = FlexDirectionProperties &
  FlexWrapProperties &
  FlexJustifyContentProperties &
  FlexAlignItemsProperties &
  FlexAlignContentProperties &
  FlexAlignSelfProperties;

const flexStyles: FlexStyles = {
  ...flexDirectionProperties,
  ...flexWrapProperties,
  ...flexJustifyContentProperties,
  ...flexAlignItemsProperties,
  ...flexAlignContentProperties,
  ...flexAlignSelfProperties,
};

export {flexStyles};
