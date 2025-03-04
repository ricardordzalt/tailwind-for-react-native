import {StyleSheet, TextStyle} from 'react-native';

export type IncludeFontPaddingtKeys = 'font-padding' | 'font-padding-none';

export type IncludeFontPaddingStyle = {
  includeFontPadding: TextStyle['includeFontPadding'];
};

export type IncludeFontPadding = Record<
  IncludeFontPaddingtKeys,
  IncludeFontPaddingStyle
>;

export const includeFontPadding = StyleSheet.create<IncludeFontPadding>({
  'font-padding': {includeFontPadding: true},
  'font-padding-none': {includeFontPadding: false},
});
