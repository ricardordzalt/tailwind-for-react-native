import {StyleSheet} from 'react-native';

export type FlexAlignContentProperties = {
  'content-start': {alignContent: 'flex-start'};
  'content-end': {alignContent: 'flex-end'};
  'content-stretch': {alignContent: 'stretch'};
  'content-center': {alignContent: 'center'};
  'content-between': {alignContent: 'space-between'};
  'content-around': {alignContent: 'space-around'};
};

export const flexAlignContentProperties: FlexAlignContentProperties =
  StyleSheet.create({
    'content-start': {
      alignContent: 'flex-start',
    },
    'content-end': {
      alignContent: 'flex-end',
    },
    'content-stretch': {
      alignContent: 'stretch',
    },
    'content-center': {
      alignContent: 'center',
    },
    'content-between': {
      alignContent: 'space-between',
    },
    'content-around': {
      alignContent: 'space-around',
    },
  });
