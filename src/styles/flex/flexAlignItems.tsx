import {StyleSheet} from 'react-native';

export type FlexAlignItemsProperties = {
  'items-start': {alignItems: 'flex-start'};
  'items-end': {alignItems: 'flex-end'};
  'items-center': {alignItems: 'center'};
  'items-baseline': {alignItems: 'baseline'};
  'items-stretch': {alignItems: 'stretch'};
};

export const flexAlignItemsProperties: FlexAlignItemsProperties =
  StyleSheet.create({
    'items-start': {alignItems: 'flex-start'},
    'items-end': {alignItems: 'flex-end'},
    'items-center': {alignItems: 'center'},
    'items-baseline': {alignItems: 'baseline'},
    'items-stretch': {alignItems: 'stretch'},
  });
