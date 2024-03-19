import {StyleSheet} from 'react-native';

export type TextAlignProperties = {
  'text-auto': {textAlign: 'auto'};
  'text-left': {textAlign: 'left'};
  'text-center': {textAlign: 'center'};
  'text-right': {textAlign: 'right'};
  'text-justify': {textAlign: 'justify'};
};

export const textAlignProperties: TextAlignProperties = StyleSheet.create({
  'text-auto': {textAlign: 'auto'},
  'text-left': {textAlign: 'left'},
  'text-center': {textAlign: 'center'},
  'text-right': {textAlign: 'right'},
  'text-justify': {textAlign: 'justify'},
});
