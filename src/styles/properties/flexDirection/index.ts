import {StyleSheet, ViewStyle} from 'react-native';

export type FlexDirectionKeys =
  | 'flex-col'
  | 'flex-row'
  | 'flex-col-reverse'
  | 'flex-row-reverse';

export type FlexDirectionStyle = {flexDirection: ViewStyle['flexDirection']};

export type FlexDirection = Record<FlexDirectionKeys, FlexDirectionStyle>;

export const flexDirection = StyleSheet.create<FlexDirection>({
  'flex-col': {flexDirection: 'column'},
  'flex-row': {flexDirection: 'row'},
  'flex-col-reverse': {flexDirection: 'column-reverse'},
  'flex-row-reverse': {flexDirection: 'row-reverse'},
});
