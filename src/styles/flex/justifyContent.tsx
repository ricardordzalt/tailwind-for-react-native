import {StyleSheet} from 'react-native';

export type FlexJustifyContentProperties = {
  'justify-start': {justifyContent: 'flex-start'};
  'justify-end': {justifyContent: 'flex-end'};
  'justify-center': {justifyContent: 'center'};
  'justify-between': {justifyContent: 'space-between'};
  'justify-around': {justifyContent: 'space-around'};
  'justify-evenly': {justifyContent: 'space-evenly'};
};

export const flexJustifyContentProperties: FlexJustifyContentProperties =
  StyleSheet.create({
    'justify-start': {justifyContent: 'flex-start'},
    'justify-end': {justifyContent: 'flex-end'},
    'justify-center': {justifyContent: 'center'},
    'justify-between': {justifyContent: 'space-between'},
    'justify-around': {justifyContent: 'space-around'},
    'justify-evenly': {justifyContent: 'space-evenly'},
  });
