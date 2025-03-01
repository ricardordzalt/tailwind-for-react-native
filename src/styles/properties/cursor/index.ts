import {StyleSheet, ViewStyle} from 'react-native';

export type CursorKeys = 'cursor-auto' | 'cursor-pointer';

export type CursorProperties = Record<CursorKeys, ViewStyle>;

export const cursorProperties = StyleSheet.create<CursorProperties>({
  'cursor-auto': {cursor: 'auto'},
  'cursor-pointer': {cursor: 'pointer'},
});
