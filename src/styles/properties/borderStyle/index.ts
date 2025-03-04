import {StyleSheet, ViewStyle} from 'react-native';

export type BorderStyleKeys =
  | 'border-solid'
  | 'border-dotted'
  | 'border-dashed';

export type BorderStyleStyle = {borderStyle: ViewStyle['borderStyle']};

export type BorderStyle = Record<BorderStyleKeys, BorderStyleStyle>;

export const borderStyle = StyleSheet.create<BorderStyle>({
  'border-solid': {borderStyle: 'solid'},
  'border-dotted': {borderStyle: 'dotted'},
  'border-dashed': {borderStyle: 'dashed'},
});
