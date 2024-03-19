export type StylesType = string;
export type ArrayOfStyleStringType = string[];

const stylesSeparator = (
  stylesString: StylesType = '',
): ArrayOfStyleStringType => stylesString.split(' ').filter(Boolean);

export default stylesSeparator;
