import {getStyleFromStyleStringType} from './get-style-from-style-string.d';
import stylesPrefixes from '../styles/prefixes';

const getStyleFromStyleString = ({
  styleString,
  window,
  colors,
}: getStyleFromStyleStringType) => {
  const splittedStyleString = styleString.split('-');
  let keyProp = '',
    value: string | number = '';
  if (
    splittedStyleString.length > 2 &&
    colors[
      `${splittedStyleString[splittedStyleString.length - 2]}-${
        splittedStyleString[splittedStyleString.length - 1]
      }`
    ]
  ) {
    splittedStyleString.forEach((el, index) => {
      if (index >= splittedStyleString.length - 2 && !value) {
        value =
          colors[
            `${splittedStyleString[splittedStyleString.length - 2]}-${
              splittedStyleString[splittedStyleString.length - 1]
            }`
          ];
      } else if (index < splittedStyleString.length - 2) {
        keyProp += index === 0 ? el : '-' + el;
      }
    });
  } else if (
    splittedStyleString.length === 2 &&
    colors[splittedStyleString[splittedStyleString.length - 1]]
  ) {
    keyProp = splittedStyleString[0];
    value = colors[splittedStyleString[splittedStyleString.length - 1]];
  } else {
    splittedStyleString.forEach((el, index) => {
      if (index === splittedStyleString.length - 1) {
        if (el.includes('(') && el.includes(')')) {
          const {height, width} = window;
          const numberValue = Number(
            el.replace('wp(', '').replace('hp(', '').replace(')', ''),
          );
          value = el.startsWith('w')
            ? width * (numberValue / 100)
            : height * (numberValue / 100);
        } else if (
          typeof Number(el) === 'number' &&
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
        value = colors[value] ? colors[value] : value;
      } else {
        keyProp += index === 0 ? el : '-' + el;
      }
    });
  }
  const property = stylesPrefixes[keyProp];
  let properties = {};
  if (Array.isArray(property)) {
    for (let i = 0; i < property.length; i++) {
      properties = {...properties, [property[i]]: value};
    }
  }
  return [property]
    ? typeof property === 'string'
      ? {
          [property]: value,
        }
      : Array.isArray(property)
      ? properties
      : {}
    : {};
};

export default getStyleFromStyleString;
