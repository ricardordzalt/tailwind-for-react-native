import {StyleSheet, TextStyle} from 'react-native';

export type TextAlignKeys =
  | 'text-auto'
  | 'text-left'
  | 'text-center'
  | 'text-right'
  | 'text-justify';

export type TextAlignStyle = {textAlign: TextStyle['textAlign']};

export type TextAlign = Record<TextAlignKeys, TextAlignStyle>;

export const textAlign = StyleSheet.create<TextAlign>({
  'text-auto': {textAlign: 'auto'},
  'text-left': {textAlign: 'left'},
  'text-center': {textAlign: 'center'},
  'text-right': {textAlign: 'right'},
  'text-justify': {textAlign: 'justify'},
});
