import {StyleSheet, TextStyle} from 'react-native';

export type FontStyleKeys = 'font-style-normal' | 'font-style-italic';

export type FontStyleStyle = {fontStyle: TextStyle['fontStyle']};

export type FontStyle = Record<FontStyleKeys, FontStyleStyle>;

export const fontStyle = StyleSheet.create<FontStyle>({
  'font-style-normal': {fontStyle: 'normal'},
  'font-style-italic': {fontStyle: 'italic'},
});
