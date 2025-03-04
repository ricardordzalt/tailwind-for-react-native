import {StyleSheet, TextStyle} from 'react-native';

export type FontWeightKeys =
  | 'font-black'
  | 'font-bold'
  | 'font-extrabold'
  | 'font-extralight'
  | 'font-light'
  | 'font-medium'
  | 'font-normal'
  | 'font-semibold'
  | 'font-thin';

export type FontWeightStyle = {fontWeight: TextStyle['fontWeight']};

export type FontWeight = Record<FontWeightKeys, FontWeightStyle>;

export const fontWeight = StyleSheet.create<FontWeight>({
  'font-black': {fontWeight: '900'},
  'font-bold': {fontWeight: '700'},
  'font-extrabold': {fontWeight: '800'},
  'font-extralight': {fontWeight: '200'},
  'font-light': {fontWeight: '300'},
  'font-medium': {fontWeight: '500'},
  'font-normal': {fontWeight: '400'},
  'font-semibold': {fontWeight: '600'},
  'font-thin': {fontWeight: '100'},
});
