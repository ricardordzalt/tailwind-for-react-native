import {getStyleFromStyleStringType} from './get-style-from-style-string.d';
import stylesPrefixes, {StylesPrefixes} from '../styles/prefixes';
import getPropByString from './get-prop-by-string';

const getStyleFromStyleString = ({
  styleString,
  window,
  colors,
  wpFactorConversion,
  hpFactorConversion,
}: getStyleFromStyleStringType) => {
  const splittedStyleString = styleString.split('-');
  let keyProp = splittedStyleString
    .slice(0, -1)
    .join('-') as keyof StylesPrefixes;
  const lastTwo = splittedStyleString.slice(-2).join('-');
  const lastOne = splittedStyleString[splittedStyleString.length - 1];
  let value: string | number =
    getPropByString(colors, lastTwo) || getPropByString(colors, lastOne) || '';

  if (
    !value &&
    (lastOne.includes('wp(') ||
      lastOne.includes('hp(') ||
      lastOne.includes('wppx(') ||
      lastOne.includes('hppx('))
  ) {
    const numericValue = parseFloat(lastOne.replace(/\D+/g, ''));
    const isWidth = lastOne.startsWith('w');
    const factor = lastOne.includes('ppx')
      ? isWidth
        ? wpFactorConversion
        : hpFactorConversion
      : 100;
    value = ((isWidth ? window.width : window.height) * numericValue) / factor;
  } else if (
    !value &&
    !isNaN(Number(lastOne)) &&
    !lastOne.includes('%') &&
    !lastOne.includes('#')
  ) {
    value = Number(lastOne);
  } else if (!value) {
    value = lastOne;
  }

  const property = stylesPrefixes[keyProp];
  return property
    ? Array.isArray(property)
      ? property.reduce((acc, prop) => ({...acc, [prop]: value}), {})
      : {[property]: value}
    : {};
};

export default getStyleFromStyleString;
