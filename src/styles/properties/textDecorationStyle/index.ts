import {StyleSheet, TextStyle} from 'react-native';

export type TextDecorationStyleKeys =
  | 'decoration-solid'
  | 'decoration-double'
  | 'decoration-dotted'
  | 'decoration-dashed';

export type TextDecorationStyleStyle = {
  textDecorationStyle: TextStyle['textDecorationStyle'];
};

export type TextDecorationStyle = Record<
  TextDecorationStyleKeys,
  TextDecorationStyleStyle
>;

export const textDecorationStyle = StyleSheet.create<TextDecorationStyle>({
  'decoration-solid': {textDecorationStyle: 'solid'},
  'decoration-double': {textDecorationStyle: 'double'},
  'decoration-dotted': {textDecorationStyle: 'dotted'},
  'decoration-dashed': {textDecorationStyle: 'dashed'},
});
