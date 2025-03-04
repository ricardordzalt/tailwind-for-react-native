import {StyleSheet, TextStyle} from 'react-native';

export type TextAlignVerticalKeys =
  | 'text-vertical-auto'
  | 'text-vertical-top'
  | 'text-vertical-bottom'
  | 'text-vertical-center';

export type TextAlignVerticalStyle = {
  textAlignVertical: TextStyle['textAlignVertical'];
};

export type TextAlignVertical = Record<
  TextAlignVerticalKeys,
  TextAlignVerticalStyle
>;

export const textAlignVertical = StyleSheet.create<TextAlignVertical>({
  'text-vertical-auto': {textAlignVertical: 'auto'},
  'text-vertical-top': {textAlignVertical: 'top'},
  'text-vertical-bottom': {textAlignVertical: 'bottom'},
  'text-vertical-center': {textAlignVertical: 'center'},
});
