import {Mode} from '../providers/tw-rn-provider.d';

const getFilteredArrayOfStyleStringsByMode = (
  arrayOfStyleString: string[],
  mode: Mode,
): string[] => {
  const filteredArrayOfStyleStringsByMode = arrayOfStyleString
    .map((styleString: string) => {
      const isLightMode = mode === 'light';
      const isDarkStyleString = styleString.startsWith('dark:');
      if (isLightMode && isDarkStyleString) {
        return null;
      } else if (!isLightMode && isDarkStyleString){
        const styleStringWithoutMode = styleString.replace('dark:', '');
        return styleStringWithoutMode;
      }
      return styleString;
    })
    .filter(e => e !== null);
  return filteredArrayOfStyleStringsByMode as string[];
};

export default getFilteredArrayOfStyleStringsByMode;
