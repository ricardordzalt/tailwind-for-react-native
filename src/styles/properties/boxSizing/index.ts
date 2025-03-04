import {StyleSheet, ViewStyle} from 'react-native';

export type BoxSizingKeys = 'box-border' | 'box-content';

export type BoxSizingStyle = {boxSizing: ViewStyle['boxSizing']};

export type BoxSizing = Record<BoxSizingKeys, BoxSizingStyle>;

export const boxSizing = StyleSheet.create<BoxSizing>({
  'box-border': {boxSizing: 'border-box'},
  'box-content': {boxSizing: 'content-box'},
});
