import {StyleSheet} from 'react-native';

export type DisplayProperties = {
  'd-flex': {display: 'flex'};
  'd-none': {display: 'none'};
};

export const displayProperties: DisplayProperties = StyleSheet.create({
  'd-flex': {
    display: 'flex',
  },
  'd-none': {
    display: 'none',
  },
});
