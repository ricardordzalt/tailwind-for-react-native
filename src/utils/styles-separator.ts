import {StylesType, ArrayOfStyleStringType} from './styles-separator.d';

const stylesSeparator = (
  stylesString: StylesType = '',
): ArrayOfStyleStringType => {
  const styles = stylesString.split(' ');
  const filteredEmptyStyles = styles.filter(style => style !== '');
  return filteredEmptyStyles;
};

export default stylesSeparator;
