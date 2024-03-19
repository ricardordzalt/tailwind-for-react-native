import {StyleSheet} from 'react-native';

export type DirectionProperties = {
  'dir-inherit': {
    direction: 'inherit';
  };
  'dir-ltr': {
    direction: 'ltr';
  };
  'dir-rtl': {
    direction: 'rtl';
  };
};

export const directionProperties: DirectionProperties = StyleSheet.create({
  'dir-inherit': {
    direction: 'inherit',
  },
  'dir-ltr': {
    direction: 'ltr',
  },
  'dir-rtl': {
    direction: 'rtl',
  },
});
