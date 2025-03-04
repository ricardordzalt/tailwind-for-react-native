import {StyleSheet, TextStyle} from 'react-native';

export type FontVariantKeys =
  | 'small-caps'
  | 'oldstyle-nums'
  | 'lining-nums'
  | 'tabular-nums'
  | 'proportional-nums';

export type FontVariantStyle = {fontVariant: TextStyle['fontVariant']};

export type FontVariant = Record<FontVariantKeys, FontVariantStyle>;

export const fontVariant = StyleSheet.create<FontVariant>({
  'small-caps': {fontVariant: ['small-caps']},
  'oldstyle-nums': {fontVariant: ['oldstyle-nums']},
  'lining-nums': {fontVariant: ['lining-nums']},
  'tabular-nums': {fontVariant: ['tabular-nums']},
  'proportional-nums': {fontVariant: ['proportional-nums']},
});
