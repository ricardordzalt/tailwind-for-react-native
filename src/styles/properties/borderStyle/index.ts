import {StyleSheet, ViewStyle} from 'react-native';

export type BorderStyleKeys =
  | 'border-solid'
  | 'border-dotted'
  | 'border-dashed';

export type BorderStyleProperties = Record<BorderStyleKeys, ViewStyle>;

export const borderStyleProperties = StyleSheet.create<BorderStyleProperties>({
  'border-solid': {borderStyle: 'solid'},
  'border-dotted': {borderStyle: 'dotted'},
  'border-dashed': {borderStyle: 'dashed'},
});
