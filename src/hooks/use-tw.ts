import {useRef} from 'react';
import {Platform, useWindowDimensions} from 'react-native';
import {COLORS} from '../constants/colors';
import {useTWRNContext} from '../providers/tw-rn-provider';
import type {Mode} from '../providers/tw-rn-provider.d';
import getFilteredArrayOfStyleStringsByPlatform from '../utils/get-filtered-array-of-style-strings-by-platform';
import getFilteredArrayOfStyleStringsByBreakpoint from '../utils/get-filtered-array-of-style-strings-by-breakpoint';
import getFilteredArrayOfStyleStringsByMode from '../utils/get-filtered-array-of-style-strings-by-mode';
import getStyleFromStyleString from '../utils/get-style-from-style-string';
import stylesSeparator from '../utils/styles-separator';
import getNestedStyleFromString from '../utils/get-nested-style-from-string';
import isObjectRecord from '../utils/is-object-record';
import {properties as STYLES} from '../styles/properties';

export type StylesType = string;
export type TailwindStylesGeneratorType = (stylesString: string) => Record<string, any>;

export interface UseTWReturn {
  tw: TailwindStylesGeneratorType;
  mode: Mode;
  toggleMode: () => void;
  colors: Record<string, any> | undefined;
  hppx: (numberValue: number) => number;
  wppx: (numberValue: number) => number;
}

const useTW = (): UseTWReturn => {
  // For screen dimensions
  const window = useWindowDimensions();
  const {
    styles: contextStyles,
    classes: contextClasses,
    colors: contextColors,
    mode,
    toggleMode,
    breakpoints,
    wpFactorConversion,
    hpFactorConversion,
  } = useTWRNContext();
  const normalizedContextStyles = isObjectRecord(contextStyles)
    ? contextStyles
    : {};
  const normalizedContextClasses = isObjectRecord(contextClasses)
    ? contextClasses
    : {};
  const normalizedContextColors = isObjectRecord(contextColors)
    ? contextColors
    : {};

  const cacheRef = useRef(new Map<string, any>());
  const prevDepsRef = useRef<{
    mode: any;
    width: number;
    height: number;
    contextStyles: any;
    contextClasses: any;
    contextColors: any;
    breakpoints: any;
  } | null>(null);

  const prev = prevDepsRef.current;
  if (
    !prev ||
    prev.mode !== mode ||
    prev.width !== window.width ||
    prev.height !== window.height ||
    prev.contextStyles !== contextStyles ||
    prev.contextClasses !== contextClasses ||
    prev.contextColors !== contextColors ||
    prev.breakpoints !== breakpoints
  ) {
    cacheRef.current.clear();
    prevDepsRef.current = {
      mode,
      width: window.width,
      height: window.height,
      contextStyles,
      contextClasses,
      contextColors,
      breakpoints,
    };
  }

  const allStyles = {
    ...STYLES,
    ...normalizedContextStyles,
  };

  const allColors = {
    ...COLORS,
    ...normalizedContextColors,
  };

  const getFlatOrNestedMatch = (
    source: Record<string, unknown>,
    styleString: string,
  ): unknown => {
    const matchedFlatValue = source[styleString];
    if (matchedFlatValue !== undefined) {
      return matchedFlatValue;
    }
    if (!styleString.includes('.')) {
      return undefined;
    }
    return getNestedStyleFromString(source, styleString);
  };

  const getMatchedObjectStyle = (styleString: string) => {
    const matchedStyle = getFlatOrNestedMatch(allStyles, styleString);
    if (isObjectRecord(matchedStyle)) {
      return matchedStyle;
    }
    return undefined;
  };

  const getMatchedClassString = (styleString: string) => {
    const classSources = [
      normalizedContextClasses,
      // Backward-compatible fallback: allow string aliases inside `theme.styles`.
      normalizedContextStyles,
    ];
    for (let i = 0; i < classSources.length; i++) {
      const matchedClass = getFlatOrNestedMatch(classSources[i], styleString);
      if (typeof matchedClass === 'string') {
        return matchedClass;
      }
    }
    return undefined;
  };

  const resolveStyleString = (
    stylesString: StylesType,
    visitedClassAliases: Set<string>,
  ) => {
    const arrayOfStyleString = stylesSeparator(stylesString);
    const filteredArrayOfStyleStringsByPlatform =
      getFilteredArrayOfStyleStringsByPlatform(arrayOfStyleString, Platform.OS);
    const filteredArrayOfStyleStringsByBreakpoint =
      getFilteredArrayOfStyleStringsByBreakpoint(
        filteredArrayOfStyleStringsByPlatform,
        window.width,
        breakpoints,
      );
    const filteredArrayOfStyleStringsByMode =
      getFilteredArrayOfStyleStringsByMode(
        filteredArrayOfStyleStringsByBreakpoint,
        mode,
      );
    let styles = {};
    const styleStringsLength = filteredArrayOfStyleStringsByMode?.length;
    for (let i = 0; i < styleStringsLength; i++) {
      const currentStyleString = filteredArrayOfStyleStringsByMode[i];
      const matchedStyle = getMatchedObjectStyle(currentStyleString);
      if (matchedStyle) {
        styles = {
          ...styles,
          ...matchedStyle,
        };
        continue;
      }

      const matchedClass = getMatchedClassString(currentStyleString);
      if (typeof matchedClass === 'string') {
        if (!visitedClassAliases.has(currentStyleString)) {
          const nextVisitedClassAliases = new Set(visitedClassAliases);
          nextVisitedClassAliases.add(currentStyleString);
          const resolvedAliasStyle = resolveStyleString(
            matchedClass,
            nextVisitedClassAliases,
          );
          styles = {
            ...styles,
            ...resolvedAliasStyle,
          };
        }
        continue;
      }

      const style = getStyleFromStyleString({
        styleString: currentStyleString,
        window,
        colors: allColors,
        wpFactorConversion,
        hpFactorConversion,
      });
      styles = {
        ...styles,
        ...style,
      };
    }
    return styles;
  };
  const tw: TailwindStylesGeneratorType = (stylesString: StylesType) => {
    const cached = cacheRef.current.get(stylesString);
    if (cached) return cached;
    const result = resolveStyleString(stylesString, new Set<string>());
    cacheRef.current.set(stylesString, result);
    return result;
  };

  const hppx = (numberValue: number): number =>  (window?.height * (numberValue / 100)) / hpFactorConversion
  const wppx = (numberValue: number): number =>  (window?.width * (numberValue / 100)) / wpFactorConversion
  return {
    tw,
    mode,
    toggleMode,
    colors: contextColors,
    hppx,
    wppx
  };
};

export default useTW;
