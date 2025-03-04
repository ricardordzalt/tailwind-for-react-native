import {StyleSheet, ViewStyle} from 'react-native';

export type DisplayKeys = 'd-flex' | 'd-none';

export type DisplayStyle = {display: ViewStyle['display']};

export type Display = Record<DisplayKeys, DisplayStyle>;

export const display = StyleSheet.create<Display>({
  'd-flex': {display: 'flex'},
  'd-none': {display: 'none'},
});
