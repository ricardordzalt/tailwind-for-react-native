import {StyleSheet, ViewStyle} from 'react-native';

export type BorderStyleKeys = 'box-border' | 'box-content';

export type BorderStyleProperties = Record<BorderStyleKeys, ViewStyle>;

export const borderStyleProperties = StyleSheet.create<BorderStyleProperties>({
  'box-border': {boxSizing: 'border-box'},
  'box-content': {boxSizing: 'content-box'},
});
