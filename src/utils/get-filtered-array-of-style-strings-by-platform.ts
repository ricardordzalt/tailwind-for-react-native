import {Platform} from 'react-native';

const getFilteredArrayOfStyleStringsByPlatform = (
  arrayOfStyleString: string[],
  platform: typeof Platform.OS,
): string[] => {
  const filteredArrayOfStyleStringsByPlatform = arrayOfStyleString
    .map((styleString: string) => {
      const specifiesPlatform =
        styleString.startsWith('android:') || styleString.startsWith('ios:');
      const matchPlatform = specifiesPlatform
        ? (styleString.startsWith('android:') && platform === 'android') ||
          (styleString.startsWith('ios:') && platform === 'ios')
        : true;
      if (matchPlatform) {
        const styleStringWithoutPlatform = styleString
          .replace('ios:', '')
          .replace('android:', '');
        return styleStringWithoutPlatform;
      }
      if (!matchPlatform) {
        return null;
      }
      return null;
    })
    .filter(e => e !== null);
  return filteredArrayOfStyleStringsByPlatform as string[];
};

export default getFilteredArrayOfStyleStringsByPlatform;
