import {StyleSheet, TextStyle} from 'react-native';

export type FontStyleKeys = 'font-style-normal' | 'font-style-italic';

export type FontStyleProperties = Record<FontStyleKeys, TextStyle>;

export const fontStyleProperties = StyleSheet.create<FontStyleProperties>({
  'font-style-normal': {fontStyle: 'normal'},
  'font-style-italic': {fontStyle: 'italic'},
});
