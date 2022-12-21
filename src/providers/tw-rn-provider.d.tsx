import {Dispatch, SetStateAction} from 'react';

export type Mode = 'light' | 'dark';

export type TWRNContextType = {
  mode: Mode;
  toggleMode: () => void;
  setMode: Dispatch<SetStateAction<Mode>>;
};

export type TWRNProviderProps = {
  mode?: Mode;
  children?: React.ReactNode;
  styles?: any;
};
