import {StyleSheet, TextStyle} from 'react-native';

export type VerticalAlignKeys =
  | 'vertical-auto'
  | 'vertical-top'
  | 'vertical-bottom'
  | 'vertical-middle';

export type VerticalAlignStyle = {
  verticalAlign: TextStyle['verticalAlign'];
};

export type VerticalAlign = Record<VerticalAlignKeys, VerticalAlignStyle>;

export const verticalAlign = StyleSheet.create<VerticalAlign>({
  'vertical-auto': {verticalAlign: 'auto'},
  'vertical-top': {verticalAlign: 'top'},
  'vertical-bottom': {verticalAlign: 'bottom'},
  'vertical-middle': {verticalAlign: 'middle'},
});
