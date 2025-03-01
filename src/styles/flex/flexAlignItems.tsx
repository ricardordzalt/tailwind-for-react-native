import {StyleSheet, ViewStyle} from 'react-native';

export type AlignItemsKeys =
  | 'items-start'
  | 'items-end'
  | 'items-center'
  | 'items-baseline'
  | 'items-stretch';

export type AlignItemsProperties = Record<AlignItemsKeys, ViewStyle>;

export const alignItemsProperties = StyleSheet.create<AlignItemsProperties>({
  'items-start': {alignItems: 'flex-start'},
  'items-end': {alignItems: 'flex-end'},
  'items-center': {alignItems: 'center'},
  'items-baseline': {alignItems: 'baseline'},
  'items-stretch': {alignItems: 'stretch'},
});
