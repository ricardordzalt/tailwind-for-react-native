import { Platform, StyleSheet, ViewStyle } from 'react-native';

export type ShadowLevel =
  | 0
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

export type ShadowDirection = 't' | 'b' | 'l' | 'r' | 'x' | 'y';

export type ShadowKey =
  | 'shadow-none'
  | `shadow-${ShadowLevel}`
  | `shadow-${ShadowDirection}-${Exclude<ShadowLevel, 0>}`;

export type ShadowStyle = ViewStyle;

export type Shadow = Record<ShadowKey, ShadowStyle>;

const selectShadow = (
  elevation: number,
  width: number,
  height: number,
  shadowOpacity: number,
  shadowRadius: number,
): ShadowStyle =>
  Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width, height },
      shadowOpacity,
      shadowRadius,
    },
    android: {
      elevation,
      shadowColor: '#000',
    },
    default: {},
  }) as ShadowStyle;

/**
 * Cross-platform shadow presets based on Material Design elevation.
 * Source: https://ethercreative.github.io/react-native-shadow-generator/
 *
 * iOS  → shadowColor, shadowOffset, shadowOpacity, shadowRadius
 * Android → elevation (+ shadowColor for tint on API 28+)
 * Both props are included per entry; each platform uses what it supports.
 */
export const shadow = StyleSheet.create<Shadow>({
  'shadow-none': selectShadow(0, 0, 0, 0.00, 0.00),
  'shadow-0': selectShadow(0, 0, 0, 0.00, 0.00),

  // ─── Base (shadow going down) ────────────────────────────────────────────────
  'shadow-1': selectShadow(1, 0, 1, 0.20, 1.00),
  'shadow-2': selectShadow(2, 0, 1, 0.22, 1.41),
  'shadow-3': selectShadow(3, 0, 1, 0.23, 2.22),
  'shadow-4': selectShadow(4, 0, 2, 0.25, 2.62),
  'shadow-5': selectShadow(5, 0, 2, 0.27, 3.84),
  'shadow-6': selectShadow(6, 0, 3, 0.29, 4.65),
  'shadow-7': selectShadow(7, 0, 3, 0.30, 4.65),
  'shadow-8': selectShadow(8, 0, 4, 0.32, 4.65),
  'shadow-9': selectShadow(9, 0, 4, 0.34, 5.46),
  'shadow-10': selectShadow(10, 0, 5, 0.36, 6.27),
  'shadow-11': selectShadow(11, 0, 5, 0.37, 6.68),
  'shadow-12': selectShadow(12, 0, 6, 0.39, 7.49),
  'shadow-13': selectShadow(13, 0, 6, 0.41, 8.30),
  'shadow-14': selectShadow(14, 0, 7, 0.43, 9.11),
  'shadow-15': selectShadow(15, 0, 7, 0.44, 9.51),
  'shadow-16': selectShadow(16, 0, 8, 0.46, 10.32),
  'shadow-17': selectShadow(17, 0, 8, 0.48, 11.14),
  'shadow-18': selectShadow(18, 0, 9, 0.50, 11.95),
  'shadow-19': selectShadow(19, 0, 9, 0.51, 12.35),
  'shadow-20': selectShadow(20, 0, 10, 0.53, 13.16),
  'shadow-21': selectShadow(21, 0, 10, 0.55, 13.97),
  'shadow-22': selectShadow(22, 0, 11, 0.57, 14.78),
  'shadow-23': selectShadow(23, 0, 11, 0.58, 15.19),
  'shadow-24': selectShadow(24, 0, 12, 0.60, 16.00),

  // ─── Bottom (same as base) ───────────────────────────────────────────────────
  'shadow-b-1': selectShadow(1, 0, 1, 0.20, 1.00),
  'shadow-b-2': selectShadow(2, 0, 1, 0.22, 1.41),
  'shadow-b-3': selectShadow(3, 0, 1, 0.23, 2.22),
  'shadow-b-4': selectShadow(4, 0, 2, 0.25, 2.62),
  'shadow-b-5': selectShadow(5, 0, 2, 0.27, 3.84),
  'shadow-b-6': selectShadow(6, 0, 3, 0.29, 4.65),
  'shadow-b-7': selectShadow(7, 0, 3, 0.30, 4.65),
  'shadow-b-8': selectShadow(8, 0, 4, 0.32, 4.65),
  'shadow-b-9': selectShadow(9, 0, 4, 0.34, 5.46),
  'shadow-b-10': selectShadow(10, 0, 5, 0.36, 6.27),
  'shadow-b-11': selectShadow(11, 0, 5, 0.37, 6.68),
  'shadow-b-12': selectShadow(12, 0, 6, 0.39, 7.49),
  'shadow-b-13': selectShadow(13, 0, 6, 0.41, 8.30),
  'shadow-b-14': selectShadow(14, 0, 7, 0.43, 9.11),
  'shadow-b-15': selectShadow(15, 0, 7, 0.44, 9.51),
  'shadow-b-16': selectShadow(16, 0, 8, 0.46, 10.32),
  'shadow-b-17': selectShadow(17, 0, 8, 0.48, 11.14),
  'shadow-b-18': selectShadow(18, 0, 9, 0.50, 11.95),
  'shadow-b-19': selectShadow(19, 0, 9, 0.51, 12.35),
  'shadow-b-20': selectShadow(20, 0, 10, 0.53, 13.16),
  'shadow-b-21': selectShadow(21, 0, 10, 0.55, 13.97),
  'shadow-b-22': selectShadow(22, 0, 11, 0.57, 14.78),
  'shadow-b-23': selectShadow(23, 0, 11, 0.58, 15.19),
  'shadow-b-24': selectShadow(24, 0, 12, 0.60, 16.00),

  // ─── Vertical axis (same as base) ────────────────────────────────────────────
  'shadow-y-1': selectShadow(1, 0, 1, 0.20, 1.00),
  'shadow-y-2': selectShadow(2, 0, 1, 0.22, 1.41),
  'shadow-y-3': selectShadow(3, 0, 1, 0.23, 2.22),
  'shadow-y-4': selectShadow(4, 0, 2, 0.25, 2.62),
  'shadow-y-5': selectShadow(5, 0, 2, 0.27, 3.84),
  'shadow-y-6': selectShadow(6, 0, 3, 0.29, 4.65),
  'shadow-y-7': selectShadow(7, 0, 3, 0.30, 4.65),
  'shadow-y-8': selectShadow(8, 0, 4, 0.32, 4.65),
  'shadow-y-9': selectShadow(9, 0, 4, 0.34, 5.46),
  'shadow-y-10': selectShadow(10, 0, 5, 0.36, 6.27),
  'shadow-y-11': selectShadow(11, 0, 5, 0.37, 6.68),
  'shadow-y-12': selectShadow(12, 0, 6, 0.39, 7.49),
  'shadow-y-13': selectShadow(13, 0, 6, 0.41, 8.30),
  'shadow-y-14': selectShadow(14, 0, 7, 0.43, 9.11),
  'shadow-y-15': selectShadow(15, 0, 7, 0.44, 9.51),
  'shadow-y-16': selectShadow(16, 0, 8, 0.46, 10.32),
  'shadow-y-17': selectShadow(17, 0, 8, 0.48, 11.14),
  'shadow-y-18': selectShadow(18, 0, 9, 0.50, 11.95),
  'shadow-y-19': selectShadow(19, 0, 9, 0.51, 12.35),
  'shadow-y-20': selectShadow(20, 0, 10, 0.53, 13.16),
  'shadow-y-21': selectShadow(21, 0, 10, 0.55, 13.97),
  'shadow-y-22': selectShadow(22, 0, 11, 0.57, 14.78),
  'shadow-y-23': selectShadow(23, 0, 11, 0.58, 15.19),
  'shadow-y-24': selectShadow(24, 0, 12, 0.60, 16.00),

  // ─── Top (negative height offset) ────────────────────────────────────────────
  'shadow-t-1': selectShadow(1, 0, -1, 0.20, 1.00),
  'shadow-t-2': selectShadow(2, 0, -1, 0.22, 1.41),
  'shadow-t-3': selectShadow(3, 0, -1, 0.23, 2.22),
  'shadow-t-4': selectShadow(4, 0, -2, 0.25, 2.62),
  'shadow-t-5': selectShadow(5, 0, -2, 0.27, 3.84),
  'shadow-t-6': selectShadow(6, 0, -3, 0.29, 4.65),
  'shadow-t-7': selectShadow(7, 0, -3, 0.30, 4.65),
  'shadow-t-8': selectShadow(8, 0, -4, 0.32, 4.65),
  'shadow-t-9': selectShadow(9, 0, -4, 0.34, 5.46),
  'shadow-t-10': selectShadow(10, 0, -5, 0.36, 6.27),
  'shadow-t-11': selectShadow(11, 0, -5, 0.37, 6.68),
  'shadow-t-12': selectShadow(12, 0, -6, 0.39, 7.49),
  'shadow-t-13': selectShadow(13, 0, -6, 0.41, 8.30),
  'shadow-t-14': selectShadow(14, 0, -7, 0.43, 9.11),
  'shadow-t-15': selectShadow(15, 0, -7, 0.44, 9.51),
  'shadow-t-16': selectShadow(16, 0, -8, 0.46, 10.32),
  'shadow-t-17': selectShadow(17, 0, -8, 0.48, 11.14),
  'shadow-t-18': selectShadow(18, 0, -9, 0.50, 11.95),
  'shadow-t-19': selectShadow(19, 0, -9, 0.51, 12.35),
  'shadow-t-20': selectShadow(20, 0, -10, 0.53, 13.16),
  'shadow-t-21': selectShadow(21, 0, -10, 0.55, 13.97),
  'shadow-t-22': selectShadow(22, 0, -11, 0.57, 14.78),
  'shadow-t-23': selectShadow(23, 0, -11, 0.58, 15.19),
  'shadow-t-24': selectShadow(24, 0, -12, 0.60, 16.00),

  // ─── Right (positive width offset) ───────────────────────────────────────────
  'shadow-r-1': selectShadow(1, 1, 0, 0.20, 1.00),
  'shadow-r-2': selectShadow(2, 1, 0, 0.22, 1.41),
  'shadow-r-3': selectShadow(3, 1, 0, 0.23, 2.22),
  'shadow-r-4': selectShadow(4, 2, 0, 0.25, 2.62),
  'shadow-r-5': selectShadow(5, 2, 0, 0.27, 3.84),
  'shadow-r-6': selectShadow(6, 3, 0, 0.29, 4.65),
  'shadow-r-7': selectShadow(7, 3, 0, 0.30, 4.65),
  'shadow-r-8': selectShadow(8, 4, 0, 0.32, 4.65),
  'shadow-r-9': selectShadow(9, 4, 0, 0.34, 5.46),
  'shadow-r-10': selectShadow(10, 5, 0, 0.36, 6.27),
  'shadow-r-11': selectShadow(11, 5, 0, 0.37, 6.68),
  'shadow-r-12': selectShadow(12, 6, 0, 0.39, 7.49),
  'shadow-r-13': selectShadow(13, 6, 0, 0.41, 8.30),
  'shadow-r-14': selectShadow(14, 7, 0, 0.43, 9.11),
  'shadow-r-15': selectShadow(15, 7, 0, 0.44, 9.51),
  'shadow-r-16': selectShadow(16, 8, 0, 0.46, 10.32),
  'shadow-r-17': selectShadow(17, 8, 0, 0.48, 11.14),
  'shadow-r-18': selectShadow(18, 9, 0, 0.50, 11.95),
  'shadow-r-19': selectShadow(19, 9, 0, 0.51, 12.35),
  'shadow-r-20': selectShadow(20, 10, 0, 0.53, 13.16),
  'shadow-r-21': selectShadow(21, 10, 0, 0.55, 13.97),
  'shadow-r-22': selectShadow(22, 11, 0, 0.57, 14.78),
  'shadow-r-23': selectShadow(23, 11, 0, 0.58, 15.19),
  'shadow-r-24': selectShadow(24, 12, 0, 0.60, 16.00),

  // ─── Horizontal axis (same as right) ─────────────────────────────────────────
  'shadow-x-1': selectShadow(1, 1, 0, 0.20, 1.00),
  'shadow-x-2': selectShadow(2, 1, 0, 0.22, 1.41),
  'shadow-x-3': selectShadow(3, 1, 0, 0.23, 2.22),
  'shadow-x-4': selectShadow(4, 2, 0, 0.25, 2.62),
  'shadow-x-5': selectShadow(5, 2, 0, 0.27, 3.84),
  'shadow-x-6': selectShadow(6, 3, 0, 0.29, 4.65),
  'shadow-x-7': selectShadow(7, 3, 0, 0.30, 4.65),
  'shadow-x-8': selectShadow(8, 4, 0, 0.32, 4.65),
  'shadow-x-9': selectShadow(9, 4, 0, 0.34, 5.46),
  'shadow-x-10': selectShadow(10, 5, 0, 0.36, 6.27),
  'shadow-x-11': selectShadow(11, 5, 0, 0.37, 6.68),
  'shadow-x-12': selectShadow(12, 6, 0, 0.39, 7.49),
  'shadow-x-13': selectShadow(13, 6, 0, 0.41, 8.30),
  'shadow-x-14': selectShadow(14, 7, 0, 0.43, 9.11),
  'shadow-x-15': selectShadow(15, 7, 0, 0.44, 9.51),
  'shadow-x-16': selectShadow(16, 8, 0, 0.46, 10.32),
  'shadow-x-17': selectShadow(17, 8, 0, 0.48, 11.14),
  'shadow-x-18': selectShadow(18, 9, 0, 0.50, 11.95),
  'shadow-x-19': selectShadow(19, 9, 0, 0.51, 12.35),
  'shadow-x-20': selectShadow(20, 10, 0, 0.53, 13.16),
  'shadow-x-21': selectShadow(21, 10, 0, 0.55, 13.97),
  'shadow-x-22': selectShadow(22, 11, 0, 0.57, 14.78),
  'shadow-x-23': selectShadow(23, 11, 0, 0.58, 15.19),
  'shadow-x-24': selectShadow(24, 12, 0, 0.60, 16.00),

  // ─── Left (negative width offset) ────────────────────────────────────────────
  'shadow-l-1': selectShadow(1, -1, 0, 0.20, 1.00),
  'shadow-l-2': selectShadow(2, -1, 0, 0.22, 1.41),
  'shadow-l-3': selectShadow(3, -1, 0, 0.23, 2.22),
  'shadow-l-4': selectShadow(4, -2, 0, 0.25, 2.62),
  'shadow-l-5': selectShadow(5, -2, 0, 0.27, 3.84),
  'shadow-l-6': selectShadow(6, -3, 0, 0.29, 4.65),
  'shadow-l-7': selectShadow(7, -3, 0, 0.30, 4.65),
  'shadow-l-8': selectShadow(8, -4, 0, 0.32, 4.65),
  'shadow-l-9': selectShadow(9, -4, 0, 0.34, 5.46),
  'shadow-l-10': selectShadow(10, -5, 0, 0.36, 6.27),
  'shadow-l-11': selectShadow(11, -5, 0, 0.37, 6.68),
  'shadow-l-12': selectShadow(12, -6, 0, 0.39, 7.49),
  'shadow-l-13': selectShadow(13, -6, 0, 0.41, 8.30),
  'shadow-l-14': selectShadow(14, -7, 0, 0.43, 9.11),
  'shadow-l-15': selectShadow(15, -7, 0, 0.44, 9.51),
  'shadow-l-16': selectShadow(16, -8, 0, 0.46, 10.32),
  'shadow-l-17': selectShadow(17, -8, 0, 0.48, 11.14),
  'shadow-l-18': selectShadow(18, -9, 0, 0.50, 11.95),
  'shadow-l-19': selectShadow(19, -9, 0, 0.51, 12.35),
  'shadow-l-20': selectShadow(20, -10, 0, 0.53, 13.16),
  'shadow-l-21': selectShadow(21, -10, 0, 0.55, 13.97),
  'shadow-l-22': selectShadow(22, -11, 0, 0.57, 14.78),
  'shadow-l-23': selectShadow(23, -11, 0, 0.58, 15.19),
  'shadow-l-24': selectShadow(24, -12, 0, 0.60, 16.00),
});
