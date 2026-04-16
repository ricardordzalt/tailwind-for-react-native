import {getStyleFromStyleStringType} from './get-style-from-style-string.d';
import stylesPrefixes, {
  getStylePrefixType,
  StylesPrefixes,
} from '../styles/prefixes';
import getPropByString from './get-prop-by-string';

const isDevEnvironment = () => process.env.NODE_ENV !== 'production';
const warnInvalidStyle = (styleString: string, reason: string) => {
  if (isDevEnvironment()) {
    console.warn(
      `[tailwind-for-react-native] Ignored invalid style "${styleString}": ${reason}.`,
    );
  }
};

const isFiniteNumberString = (value: string) =>
  /^-?\d+(\.\d+)?$/.test(value.trim());

const getStyleFromStyleString = ({
  styleString,
  window,
  colors,
  wpFactorConversion,
  hpFactorConversion,
}: getStyleFromStyleStringType) => {
  let isNegative = false;
  let effectiveStyleString = styleString;
  if (styleString.startsWith('-') && styleString.length > 1 && styleString[1] !== '#') {
    isNegative = true;
    effectiveStyleString = styleString.slice(1);
  }

  const splittedStyleString = effectiveStyleString.split('-');
  let keyProp = '' as keyof StylesPrefixes,
    value: string | number = '';
  if (
    splittedStyleString.length > 2 &&
    getPropByString(
      colors,
      `${splittedStyleString[splittedStyleString.length - 2]}-${
        splittedStyleString[splittedStyleString.length - 1]
      }`,
    )
  ) {
    splittedStyleString.forEach((el, index) => {
      if (index >= splittedStyleString.length - 2 && !value) {
        value = getPropByString(
          colors,
          `${splittedStyleString[splittedStyleString.length - 2]}-${
            splittedStyleString[splittedStyleString.length - 1]
          }`,
        );
      } else if (index < splittedStyleString.length - 2) {
        keyProp += index === 0 ? el : '-' + el;
      }
    });
  } else if (
    splittedStyleString.length === 2 &&
    getPropByString(colors, splittedStyleString[splittedStyleString.length - 1])
  ) {
    keyProp = splittedStyleString[0] as keyof StylesPrefixes;
    value = getPropByString(
      colors,
      splittedStyleString[splittedStyleString.length - 1],
    );
  } else {
    splittedStyleString.forEach((el, index) => {
      if (index === splittedStyleString.length - 1) {
        if (el.includes('(') && el.includes(')')) {
          const {height, width} = window;
          if (el.includes('wp(') || el.includes('hp(')) {
            const numberValue = Number(
              el.replace('wp(', '').replace('hp(', '').replace(')', ''),
            );
            value = el.startsWith('w')
              ? width * (numberValue / 100)
              : height * (numberValue / 100);
          } else if (el.includes('wppx(') || el.includes('hppx(')) {
            const numberValue = Number(
              el.replace('wppx(', '').replace('hppx(', '').replace(')', ''),
            );
            value = el.startsWith('w')
              ? (width * (numberValue / 100)) / wpFactorConversion
              : (height * (numberValue / 100)) / hpFactorConversion;
          }
        } else if (
          isFiniteNumberString(el) &&
          !el.includes('%') &&
          !el.includes('#') &&
          // Probably bug, white or black values should'nt pass this if
          el !== 'white' &&
          el !== 'black' &&
          el !== 'auto'
        ) {
          // In some cases, value needs to be a number
          value = Number(el);
        } else {
          value = el;
        }
        value = getPropByString(colors, value)
          ? getPropByString(colors, value)
          : value;
      } else {
        keyProp += index === 0 ? el : '-' + el;
      }
    });
  }
  const property = stylesPrefixes[keyProp];
  if (!property) {
    warnInvalidStyle(styleString, 'unknown utility');
    return {};
  }

  const stylePrefixType = getStylePrefixType(keyProp);
  if (stylePrefixType === 'number' && typeof value !== 'number') {
    const resolvedColor = getPropByString(colors, value);
    const isAllowedStringValue =
      typeof value === 'string' &&
      (value.includes('%') ||
        value === 'auto' ||
        value.startsWith('#') ||
        Boolean(resolvedColor));
    if (!isAllowedStringValue) {
      warnInvalidStyle(styleString, 'invalid numeric value');
      return {};
    }
  }

  if (typeof value === 'number' && Number.isNaN(value)) {
    warnInvalidStyle(styleString, 'parsed value is NaN');
    return {};
  }

  if (isNegative && typeof value === 'number') {
    value = -value;
  }

  let properties = {};
  if (Array.isArray(property)) {
    for (let i = 0; i < property.length; i++) {
      properties = {...properties, [property[i]]: value};
    }
  }
  if (typeof property === 'string') {
    return {
      [property]: value,
    };
  }
  if (Array.isArray(property)) {
    return properties;
  }
  return {};
};

export default getStyleFromStyleString;
