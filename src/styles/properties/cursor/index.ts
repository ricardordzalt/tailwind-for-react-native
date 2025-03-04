import {StyleSheet, ViewStyle} from 'react-native';

export type CursorKeys = 'cursor-auto' | 'cursor-pointer';

export type CursorStyle = {cursor: ViewStyle['cursor']};

export type Cursor = Record<CursorKeys, CursorStyle>;

export const cursor = StyleSheet.create<Cursor>({
  'cursor-auto': {cursor: 'auto'},
  'cursor-pointer': {cursor: 'pointer'},
});
