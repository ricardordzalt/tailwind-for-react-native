import {StyleSheet, ViewStyle} from 'react-native';

export type BorderCurveKeys =
  | 'border-curve-circular'
  | 'border-curve-continuous';

export type BorderCurveStyle = {borderCurve: ViewStyle['borderCurve']};

export type BorderCurve = Record<BorderCurveKeys, BorderCurveStyle>;

export const borderCurve = StyleSheet.create<BorderCurve>({
  'border-curve-circular': {borderCurve: 'circular'},
  'border-curve-continuous': {borderCurve: 'continuous'},
});
