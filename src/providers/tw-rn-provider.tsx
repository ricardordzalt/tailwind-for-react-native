import React, { useState, createContext, useContext, useEffect } from 'react';
import { COLORS } from "../constants/colors";
import { Mode, TWRNContextType, TWRNProviderProps } from './tw-rn-provider.d';
import isObjectRecord from '../utils/is-object-record';

const DEFAULT_VALUES: TWRNContextType = {
  mode: 'light',
  toggleMode: () => { },
  setMode: () => { },
  styles: {},
  classes: {},
  wpFactorConversion: 3.6,
  hpFactorConversion: 8,
};

export const TWRNContext = createContext<TWRNContextType>(DEFAULT_VALUES);

export const TWRNProvider: React.FC<TWRNProviderProps> = ({
  children,
  theme,
}) => {
  const {
    mode = 'light',
    styles: stylesTheme = {},
    classes: classesTheme = {},
    colors: colorsTheme = {},
    breakpoints,
    wpFactorConversion = 3.6,
    hpFactorConversion = 8,
  } = theme ?? {};

  const styles = isObjectRecord(stylesTheme) ? stylesTheme : {};
  const classes = isObjectRecord(classesTheme) ? classesTheme : {};

  const [modeState, setModeState] = useState<Mode>(
    // Ensures its dark or light mode
    mode === 'dark' ? 'dark' : 'light',
  );

  const themeColors = isObjectRecord(colorsTheme) ? colorsTheme : {};
  const themeLightColors = isObjectRecord(themeColors.light)
    ? themeColors.light
    : undefined;
  const themeDarkColors = isObjectRecord(themeColors.dark)
    ? themeColors.dark
    : undefined;
  const modeColors = modeState === 'dark' ? themeDarkColors : themeLightColors;

  const baseThemeColors = {...themeColors};
  if (themeLightColors) {
    delete baseThemeColors.light;
  }
  if (themeDarkColors) {
    delete baseThemeColors.dark;
  }

  const colors = {
    ...COLORS,
    ...baseThemeColors,
    ...modeColors,
  };

  useEffect(() => {
    if (['dark', 'light'].includes(theme?.mode ?? '')) {
      setModeState(theme?.mode ?? 'dark');
    }
  }, [theme?.mode]);

  const toggleMode = () => {
    setModeState(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <TWRNContext.Provider
      value={{
        mode: modeState,
        toggleMode,
        setMode: setModeState,
        styles,
        classes,
        colors,
        breakpoints,
        wpFactorConversion,
        hpFactorConversion,
      }}>
      {children}
    </TWRNContext.Provider>
  );
};

export const useTWRNContext = () => {
  const context = useContext(TWRNContext);
  return context;
};
