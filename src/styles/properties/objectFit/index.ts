import {ImageStyle, StyleSheet} from 'react-native';

export type ObjectFitKeys =
  | 'object-cover'
  | 'object-contain'
  | 'object-fill'
  | 'object-scale-down';

export type ObjectFitStyle = {objectFit: ImageStyle['objectFit']};

export type ObjectFit = Record<ObjectFitKeys, ObjectFitStyle>;

export const objectFit: ObjectFit = StyleSheet.create({
  'object-cover': {objectFit: 'cover'},
  'object-contain': {objectFit: 'contain'},
  'object-fill': {objectFit: 'fill'},
  'object-scale-down': {objectFit: 'scale-down'},
});
