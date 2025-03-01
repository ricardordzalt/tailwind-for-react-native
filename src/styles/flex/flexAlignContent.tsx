import {StyleSheet, ViewStyle} from 'react-native';

export type AlignContentKeys =
  | 'content-start'
  | 'content-end'
  | 'content-stretch'
  | 'content-center'
  | 'content-between'
  | 'content-around'
  | 'content-evenly';

export type AlignContentProperties = Record<
  AlignContentKeys,
  ViewStyle
>;

export const alignContentProperties =
  StyleSheet.create<AlignContentProperties>({
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
    'content-evenly': {
      alignContent: 'space-evenly',
    },
  });
