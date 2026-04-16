import {ImageStyle, StyleSheet} from 'react-native';

export type ResizeModeKey =
  | 'resize-cover'
  | 'resize-contain'
  | 'resize-stretch'
  | 'resize-repeat'
  | 'resize-center';

export type ResizeModeStyle = {resizeMode: ImageStyle['resizeMode']};

export type ResizeMode = Record<ResizeModeKey, ResizeModeStyle>;

export const resizeMode = StyleSheet.create<ResizeMode>({
  'resize-cover': {resizeMode: 'cover'},
  'resize-contain': {resizeMode: 'contain'},
  'resize-stretch': {resizeMode: 'stretch'},
  'resize-repeat': {resizeMode: 'repeat'},
  'resize-center': {resizeMode: 'center'},
});
