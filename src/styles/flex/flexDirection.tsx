import {StyleSheet} from 'react-native';

export type FlexDirectionProperties = {
  'flex-col': {flexDirection: 'column'};
  'flex-row': {flexDirection: 'row'};
  'flex-col-reverse': {flexDirection: 'column-reverse'};
  'flex-row-reverse': {flexDirection: 'row-reverse'};
};

export const flexDirectionProperties: FlexDirectionProperties =
  StyleSheet.create({
    'flex-col': {flexDirection: 'column'},
    'flex-row': {flexDirection: 'row'},
    'flex-col-reverse': {flexDirection: 'column-reverse'},
    'flex-row-reverse': {flexDirection: 'row-reverse'},
  });
