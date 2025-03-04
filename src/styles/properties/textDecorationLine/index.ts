import {StyleSheet, TextStyle} from 'react-native';

export type TextDecorationLineKeys =
  | 'underline'
  | 'line-through'
  | 'underline-line-through'
  | 'no-underline';

export type TextDecorationLineStyle = {
  textDecorationLine: TextStyle['textDecorationLine'];
};

export type TextDecorationLine = Record<
  TextDecorationLineKeys,
  TextDecorationLineStyle
>;

export const textDecorationLine = StyleSheet.create<TextDecorationLine>({
  underline: {textDecorationLine: 'underline'},
  'line-through': {textDecorationLine: 'line-through'},
  'underline-line-through': {textDecorationLine: 'underline line-through'},
  'no-underline': {textDecorationLine: 'none'},
});
