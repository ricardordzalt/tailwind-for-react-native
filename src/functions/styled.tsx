import React from 'react';
import useTW from '../hooks/use-tw';

const getStyle = (stringStyles: any[], propsValues: any) => {
  const validStringStyles = stringStyles[0].map(
    (stringLine: string, index: number) => {
      const interpolationResult = stringStyles[index + 1]?.(propsValues) ?? '';
      const stringPiece = stringLine.replace(/\n/g, '');
      return `${stringPiece}${interpolationResult}`;
    },
  );
  const validStringStyle = validStringStyles.join(' ');
  return validStringStyle;
};

const combineTWAndPropStyles = (twStyles: any, propStyles: any) => {
  if (Array.isArray(propStyles)) {
    const allStyles = [...propStyles, twStyles];
    return allStyles;
  } else {
    const allStyles = {
      ...twStyles,
      ...propStyles,
    };
    return allStyles;
  }
};

const styled =
  (ReactComponent: React.ComponentType) =>
  (...args: any[]) => {
    return (props: any) => {
      const {tw} = useTW();
      const twStringStyle = getStyle(args, props);
      const twStyles = tw(twStringStyle);
      const {style: propStyles, ...restProps} = props;
      const allStyles = combineTWAndPropStyles(twStyles, propStyles);
      return <ReactComponent style={allStyles} {...restProps} />;
    };
  };

export default styled;
