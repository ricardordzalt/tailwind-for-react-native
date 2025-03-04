import {StyleSheet, ViewStyle} from 'react-native';

export type PositionKey = 'relative' | 'absolute';

export type PositionStyle = {position: ViewStyle['position']};

export type Position = Record<PositionKey, PositionStyle>;

export const position = StyleSheet.create<Position>({
  relative: {position: 'relative'},
  absolute: {position: 'absolute'},
});
