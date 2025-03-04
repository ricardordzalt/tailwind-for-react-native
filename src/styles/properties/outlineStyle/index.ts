import {StyleSheet, ViewStyle} from 'react-native';

export type OutlineStyleKeys =
  | 'outline-solid'
  | 'outline-dotted'
  | 'outline-dashed';

export type OutlineStyleStyle = {outlineStyle: ViewStyle['outlineStyle']};

export type OutlineStyle = Record<OutlineStyleKeys, OutlineStyleStyle>;

export const outlineStyle: OutlineStyle = StyleSheet.create({
  'outline-solid': {outlineStyle: 'solid'},
  'outline-dotted': {outlineStyle: 'dotted'},
  'outline-dashed': {outlineStyle: 'dashed'},
});
