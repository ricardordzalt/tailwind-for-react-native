import {StyleSheet, ViewStyle} from 'react-native';

export type BackfaceVisibilityKeys = 'backface-hidden' | 'backface-visible';

export type BackfaceVisibilityStyle = {
  backfaceVisibility: ViewStyle['backfaceVisibility'];
};

export type BackfaceVisibility = Record<
  BackfaceVisibilityKeys,
  BackfaceVisibilityStyle
>;

export const backfaceVisibility = StyleSheet.create<BackfaceVisibility>({
  'backface-hidden': {backfaceVisibility: 'hidden'},
  'backface-visible': {backfaceVisibility: 'visible'},
});
