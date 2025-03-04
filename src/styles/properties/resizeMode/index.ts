import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

export type ResizeModeKey =
  | 'risize-cover'
  | 'risize-contain'
  | 'risize-stretch'
  | 'risize-repeat'
  | 'risize-center';

export type ResizeModeStyle = {resizeMode: ImageStyle['resizeMode']};

export type ResizeMode = Record<ResizeModeKey, ResizeModeStyle>;

export const resizeMode = StyleSheet.create<ResizeMode>({
  'risize-cover': {resizeMode: 'cover'},
  'risize-contain': {resizeMode: 'contain'},
  'risize-stretch': {resizeMode: 'stretch'},
  'risize-repeat': {resizeMode: 'repeat'},
  'risize-center': {resizeMode: 'center'},
});
