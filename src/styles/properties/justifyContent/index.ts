import {StyleSheet, ViewStyle} from 'react-native';

export type JustifyContentKey =
  | 'justify-start'
  | 'justify-end'
  | 'justify-center'
  | 'justify-between'
  | 'justify-around'
  | 'justify-evenly';

export type JustifyContentStyle = {
  justifyContent: ViewStyle['justifyContent'];
};

export type JustifyContent = Record<JustifyContentKey, JustifyContentStyle>;

export const justifyContent: JustifyContent = StyleSheet.create({
  'justify-start': {justifyContent: 'flex-start'},
  'justify-end': {justifyContent: 'flex-end'},
  'justify-center': {justifyContent: 'center'},
  'justify-between': {justifyContent: 'space-between'},
  'justify-around': {justifyContent: 'space-around'},
  'justify-evenly': {justifyContent: 'space-evenly'},
});
