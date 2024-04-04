import {StyleSheet} from 'react-native';

export type BorderStyleProperties = {
  'border-solid': {
    borderStyle: 'solid',
  };
  'border-dotted': {
    borderStyle: 'dotted',
  };
  'border-dashed': {
    borderStyle: 'dashed',
  };
};

export const borderStyleProperties: BorderStyleProperties = StyleSheet.create({
  'border-solid': {
    borderStyle: 'solid',
  },
  'border-dotted': {
    borderStyle: 'dotted',
  },
  'border-dashed': {
    borderStyle: 'dashed',
  },
});
