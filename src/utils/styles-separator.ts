export type StylesType = string;
export type ArrayOfStyleStringType = string[];

const stylesSeparator = (
  stylesString: StylesType = '',
): ArrayOfStyleStringType => stylesString.trim().split(/\s+/).filter(Boolean);

export default stylesSeparator;
