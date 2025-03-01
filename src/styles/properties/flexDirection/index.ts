import {StyleSheet, ViewStyle} from 'react-native';

export type FlexDirectionKeys =
  | 'flex-col'
  | 'flex-row'
  | 'flex-col-reverse'
  | 'flex-row-reverse';

export type FlexDirectionProperties = Record<FlexDirectionKeys, ViewStyle>;

export const flexDirectionProperties =
  StyleSheet.create<FlexDirectionProperties>({
    'flex-col': {flexDirection: 'column'},
    'flex-row': {flexDirection: 'row'},
    'flex-col-reverse': {flexDirection: 'column-reverse'},
    'flex-row-reverse': {flexDirection: 'row-reverse'},
  });
