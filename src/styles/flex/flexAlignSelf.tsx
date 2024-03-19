import {StyleSheet} from 'react-native';

export type FlexAlignSelfProperties = {
  'self-start': {alignSelf: 'flex-start'};
  'self-end': {alignSelf: 'flex-end'};
  'self-center': {alignSelf: 'center'};
  'self-baseline': {alignSelf: 'baseline'};
  'self-stretch': {alignSelf: 'stretch'};
};

export const flexAlignSelfProperties: FlexAlignSelfProperties =
  StyleSheet.create({
    'self-start': {alignSelf: 'flex-start'},
    'self-end': {alignSelf: 'flex-end'},
    'self-center': {alignSelf: 'center'},
    'self-baseline': {alignSelf: 'baseline'},
    'self-stretch': {alignSelf: 'stretch'},
  });
