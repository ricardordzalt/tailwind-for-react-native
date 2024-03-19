import {Mode} from '../providers/tw-rn-provider.d';

const getFilteredArrayOfStyleStringsByMode = (
  arrayOfStyleStrings: string[],
  mode: Mode,
): string[] => {
  return arrayOfStyleStrings
    .map(
      styleString =>
        mode === 'light' && styleString.startsWith('dark:')
          ? null
          : styleString.replace(/^dark:/, ''), // Remove 'dark:' prefix if present.
    )
    .filter((styleString): styleString is string => styleString !== null); // Type guard here
};

export default getFilteredArrayOfStyleStringsByMode;
