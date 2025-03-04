import {StyleSheet, TextStyle} from 'react-native';

export type TextTransformKeys =
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'normal-case';

export type TextTransformStyle = {
  textTransform: TextStyle['textTransform'];
};

export type TextTransform = Record<TextTransformKeys, TextTransformStyle>;

export const textTransform = StyleSheet.create<TextTransform>({
  uppercase: {textTransform: 'uppercase'},
  lowercase: {textTransform: 'lowercase'},
  capitalize: {textTransform: 'capitalize'},
  'normal-case': {textTransform: 'none'},
});
