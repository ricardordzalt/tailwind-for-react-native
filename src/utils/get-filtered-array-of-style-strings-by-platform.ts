import {Platform} from 'react-native';

type PlatformType = typeof Platform.OS;

const getFilteredArrayOfStyleStringsByPlatform = (
  arrayOfStyleStrings: string[],
  platform: PlatformType,
): string[] => {
  return arrayOfStyleStrings
    .map((styleString: string) => {
      const isPlatformSpecific = styleString.startsWith(`${platform}:`);
      const isGeneric =
        !styleString.includes('android:') && !styleString.includes('ios:');

      if (isPlatformSpecific || isGeneric) {
        return styleString.replace(/(android:|ios:)/, '');
      }
      return null;
    })
    .filter((styleString): styleString is string => styleString !== null); // Explicit type guard
};

export default getFilteredArrayOfStyleStringsByPlatform;
