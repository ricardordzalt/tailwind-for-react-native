import {StyleSheet} from 'react-native';

export type FlexWrapProperties = {
  'flex-wrap': {flexWrap: 'wrap'};
  'flex-nowrap': {flexWrap: 'nowrap'};
  'flex-wrap-reverse': {flexWrap: 'wrap-reverse'};
};

export const flexWrapProperties: FlexWrapProperties = StyleSheet.create({
  'flex-wrap': {
    flexWrap: 'wrap',
  },
  'flex-nowrap': {
    flexWrap: 'nowrap',
  },
  'flex-wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
});
