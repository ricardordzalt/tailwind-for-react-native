import {StyleSheet, TextStyle} from 'react-native';

export type WritingDirectionKeys =
  | 'writing-auto'
  | 'writing-ltr'
  | 'writing-rtl';

export type WritingDirectionStyle = {
  writingDirection: TextStyle['writingDirection'];
};

export type WritingDirectionProperties = Record<
  WritingDirectionKeys,
  WritingDirectionStyle
>;

export const writingDirectionProperties =
  StyleSheet.create<WritingDirectionProperties>({
    'writing-auto': {writingDirection: 'auto'},
    'writing-ltr': {writingDirection: 'ltr'},
    'writing-rtl': {writingDirection: 'rtl'},
  });
