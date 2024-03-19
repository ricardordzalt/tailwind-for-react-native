import {StyleSheet} from 'react-native';

export type PositionProperties = {
  relative: {position: 'relative'};
  absolute: {position: 'absolute'};
};

export const positionProperties: PositionProperties = StyleSheet.create({
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
  },
});
