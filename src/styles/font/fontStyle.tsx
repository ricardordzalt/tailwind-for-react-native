import {StyleSheet} from 'react-native';

export type FontStyleProperties = {
  'font-style-normal': {fontStyle: 'normal'};
  'font-style-italic': {fontStyle: 'italic'};
};

export const fontStyleProperties: FontStyleProperties = StyleSheet.create({
  'font-style-normal': {fontStyle: 'normal'},
  'font-style-italic': {fontStyle: 'italic'},
});
