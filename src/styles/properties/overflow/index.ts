import {StyleSheet, ViewStyle} from 'react-native';

export type OverflowKey =
  | 'overflow-visible'
  | 'overflow-hidden'
  | 'overflow-scroll';

export type OverflowStyle = {overflow: ViewStyle['overflow']};

export type Overflow = Record<OverflowKey, OverflowStyle>;

export const overflow = StyleSheet.create<Overflow>({
  'overflow-visible': {overflow: 'visible'},
  'overflow-hidden': {overflow: 'hidden'},
  'overflow-scroll': {overflow: 'scroll'},
});
