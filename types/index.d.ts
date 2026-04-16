import * as React from 'react';

export type Mode = 'light' | 'dark' | null;

export type TWRNTheme = {
  mode?: Mode;
  styles?: Record<string, any>;
  colors?: Record<string, any>;
  breakpoints?: Record<string, number>;
  wpFactorConversion?: number;
  hpFactorConversion?: number;
};

export type TWRNProviderProps = {
  children?: React.ReactNode;
  theme?: TWRNTheme;
};

export type TailwindStylesGeneratorType = (styles: string) => Record<string, any>;

declare const useTW: () => {
  tw: TailwindStylesGeneratorType;
  mode: Mode;
  toggleMode: () => void;
  colors?: Record<string, any>;
  hppx: (numberValue: number) => number;
  wppx: (numberValue: number) => number;
};

declare const styled: <P extends {}>(
  ReactComponent: React.ComponentType<P>,
) => (
  ...args: any[]
) => (props: P & {style?: React.CSSProperties}) => React.ReactElement;

declare const TWRNProvider: React.FC<TWRNProviderProps>;

export {useTW, styled, TWRNProvider};
