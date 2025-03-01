
import { StyleSheet, TextStyle } from 'react-native';

export type DisplayKeys = 'd-flex' | 'd-none';

export type DisplayProperties = Record<DisplayKeys, TextStyle>;

export const displayProperties = StyleSheet.create<DisplayProperties>({
  'd-flex': {
    display: 'flex',
  },
  'd-none': {
    display: 'none',
  },
});
