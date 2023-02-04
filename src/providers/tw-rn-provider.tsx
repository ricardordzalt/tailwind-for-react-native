import React, {useState, createContext, useContext, useEffect} from 'react';
import {Mode, TWRNContextType, TWRNProviderProps} from './tw-rn-provider.d';

const DEFAULT_VALUES: TWRNContextType = {
  mode: 'light',
  toggleMode: () => {},
  setMode: () => {},
};

export const TWRNContext = createContext<TWRNContextType>(DEFAULT_VALUES);

export const TWRNProvider: React.FC<TWRNProviderProps> = ({
  children,
  theme,
}) => {
  const {mode = 'light', styles = {}, colors = {}} = theme ?? {};
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
      }}>
      {children}
    </TWRNContext.Provider>
  );
};

export const useTWRNContext = () => {
  const context = useContext(TWRNContext);
  return context;
};
