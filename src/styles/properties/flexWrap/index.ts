import {StyleSheet, ViewStyle} from 'react-native';

export type FlexWrapKeys = 'flex-wrap' | 'flex-nowrap' | 'flex-wrap-reverse';

export type FlexWrapProperties = Record<FlexWrapKeys, ViewStyle>;

export const flexWrapProperties = StyleSheet.create<FlexWrapProperties>({
  'flex-wrap': {flexWrap: 'wrap'},
  'flex-nowrap': {flexWrap: 'nowrap'},
  'flex-wrap-reverse': {flexWrap: 'wrap-reverse'},
});
