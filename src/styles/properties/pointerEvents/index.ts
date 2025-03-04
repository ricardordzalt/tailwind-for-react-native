import {StyleSheet, ViewStyle} from 'react-native';

export type PointerEventsKey =
  | 'pointer-events-none'
  | 'pointer-events-auto'
  | 'pointer-events-box-none'
  | 'pointer-events-box-only';

export type PointerEventsStyle = {pointerEvents: ViewStyle['pointerEvents']};

export type PointerEvents = Record<PointerEventsKey, PointerEventsStyle>;

export const pointerEvents = StyleSheet.create<PointerEvents>({
  'pointer-events-none': {pointerEvents: 'none'},
  'pointer-events-auto': {pointerEvents: 'auto'},
  'pointer-events-box-none': {pointerEvents: 'box-none'},
  'pointer-events-box-only': {pointerEvents: 'box-only'},
});
