import {StyleSheet} from 'react-native';

export type OverflowProperties = {
  'overflow-visible': {overflow: 'visible'};
  'overflow-hidden': {overflow: 'hidden'};
  'overflow-scroll': {overflow: 'scroll'};
};

export const overflowProperties: OverflowProperties = StyleSheet.create({
  'overflow-visible': {
    overflow: 'visible',
  },
  'overflow-hidden': {
    overflow: 'hidden',
  },
  'overflow-scroll': {
    overflow: 'scroll',
  },
});
