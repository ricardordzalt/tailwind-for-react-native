import {StyleSheet, TextStyle} from 'react-native';

export type DirectionKeys = 'dir-inherit' | 'dir-ltr' | 'dir-rtl';

export type DirectionStyle = {direction: TextStyle['direction']};

export type Direction = Record<DirectionKeys, DirectionStyle>;

export const direction = StyleSheet.create<Direction>({
  'dir-inherit': {direction: 'inherit'},
  'dir-ltr': {direction: 'ltr'},
  'dir-rtl': {direction: 'rtl'},
});
