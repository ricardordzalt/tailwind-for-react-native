import {StyleSheet, ViewStyle} from 'react-native';

export type AlignSelfKeys =
  | 'self-start'
  | 'self-end'
  | 'self-center'
  | 'self-baseline'
  | 'self-stretch'
  | 'self-auto';

export type AlignSelf = Record<AlignSelfKeys, ViewStyle>;

export const alignSelf = StyleSheet.create<AlignSelf>({
  'self-start': {alignSelf: 'flex-start'},
  'self-end': {alignSelf: 'flex-end'},
  'self-center': {alignSelf: 'center'},
  'self-baseline': {alignSelf: 'baseline'},
  'self-stretch': {alignSelf: 'stretch'},
  'self-auto': {alignSelf: 'auto'},
});
