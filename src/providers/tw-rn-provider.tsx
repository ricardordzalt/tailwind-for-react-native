import React, {useState, createContext, useContext, useEffect} from 'react';
import { COLORS } from "../constants/colors";
import {Mode, TWRNContextType, TWRNProviderProps} from './tw-rn-provider.d';

const DEFAULT_VALUES: TWRNContextType = {
  mode: 'light',
  toggleMode: () => {},
  setMode: () => {},
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
    styles = {},
    colors: colorsTheme = {},
    wpFactorConversion = 3.6,
    hpFactorConversion = 8,
  } = theme ?? {};

  const colors = {
    ...COLORS,
    ...colorsTheme,
  };
  const [modeState, setModeState] = useState<Mode>(
    // Ensures its dark or light mode
    mode === 'dark' ? 'dark' : 'light',
  );

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
        colors,
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
