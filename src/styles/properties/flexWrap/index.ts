import {StyleSheet, ViewStyle} from 'react-native';

export type FlexWrapKeys = 'flex-wrap' | 'flex-nowrap' | 'flex-wrap-reverse';

export type FlexWrapStyle = {flexWrap: ViewStyle['flexWrap']};

export type FlexWrap = Record<FlexWrapKeys, FlexWrapStyle>;

export const flexWrap = StyleSheet.create<FlexWrap>({
  'flex-wrap': {flexWrap: 'wrap'},
  'flex-nowrap': {flexWrap: 'nowrap'},
  'flex-wrap-reverse': {flexWrap: 'wrap-reverse'},
});
