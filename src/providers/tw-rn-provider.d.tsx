import {Dispatch, SetStateAction} from 'react';

export type Mode = 'light' | 'dark' | null;

export type TWRNTheme = {
  mode?: Mode;
  styles?: any;
  colors?: any;
};

export type TWRNContextType = {
  mode: Mode;
  toggleMode: () => void;
  setMode: Dispatch<SetStateAction<Mode>>;
  styles?: any;
  colors?: any;
};

export type TWRNProviderProps = {
  children?: React.ReactNode;
  theme?: TWRNTheme;
};
