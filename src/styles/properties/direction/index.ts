import { StyleSheet, TextStyle } from 'react-native';

export type DirectionKeys = 'dir-inherit' | 'dir-ltr' | 'dir-rtl';

export type DirectionProperties = Record<DirectionKeys, TextStyle>;

export const directionProperties = StyleSheet.create<DirectionProperties>({
  'dir-inherit': { direction: 'inherit' },
  'dir-ltr': { direction: 'ltr' },
  'dir-rtl': { direction: 'rtl' },
});
