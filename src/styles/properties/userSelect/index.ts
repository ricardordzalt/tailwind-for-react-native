import {StyleSheet, TextStyle} from 'react-native';

export type UserSelectKeys =
  | 'select-auto'
  | 'select-text'
  | 'select-none'
  | 'select-contain'
  | 'select-all';

export type UserSelectStyle = {
  userSelect: TextStyle['userSelect'];
};

export type UserSelect = Record<UserSelectKeys, UserSelectStyle>;

export const userSelect = StyleSheet.create<UserSelect>({
  'select-auto': {userSelect: 'auto'},
  'select-text': {userSelect: 'text'},
  'select-none': {userSelect: 'none'},
  'select-contain': {userSelect: 'contain'},
  'select-all': {userSelect: 'all'},
});
