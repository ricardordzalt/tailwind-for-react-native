import {StyleSheet} from 'react-native';

export type TextDecorationLineProperties = {
  'text-auto': {textAlign: 'auto'},
  'text-left': {textAlign: 'left'},
  'text-center': {textAlign: 'center'},
  'text-right': {textAlign: 'right'},
  'text-justify': {textAlign: 'justify'},
}

export const textDecorationLineProperties = StyleSheet.create({
  'none': {textDecorationLine: 'none',},
  'underline': {textDecorationLine: 'underline',},
  'line-through': {textDecorationLine: 'line-through',},
  'underline-line-through': {textDecorationLine: 'underline line-through',},
});
