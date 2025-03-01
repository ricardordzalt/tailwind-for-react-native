import {StyleSheet, ViewStyle} from 'react-native';

export type BackfaceVisibilityKeys = 'backface-hidden' | 'backface-visible';

export type BackfaceVisibility = Record<BackfaceVisibilityKeys, ViewStyle>;

export const backfaceVisibility = StyleSheet.create<BackfaceVisibility>({
  'backface-hidden': {backfaceVisibility: 'visible'},
  'backface-visible': {backfaceVisibility: 'hidden'},
});
