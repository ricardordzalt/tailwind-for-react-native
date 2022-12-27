import React from 'react';
import useTW from '../hooks/use-tw';

const styled =
  ReactComponent =>
  (...args) => {
    return props => {
      const {tw} = useTW();
      const getStyle = () => {
        const validStringStyles = args[0].map((stringLine, index) => {
          const interpolationResult = args[index + 1]?.(props) ?? '';
          const stringPiece = stringLine.replaceAll('\n', '');
          return `${stringPiece}${interpolationResult}`;
        });
        const validStringStyle = validStringStyles.join(' ');
        return validStringStyle;
      };
      const twStringStyle = getStyle();
      console.log({twStringStyle});
      const twStyles = tw(twStringStyle);
      const {style: propStyles, ...restProps} = props;
      console.log({twStyles});
      return (
        <ReactComponent
          style={{
            ...twStyles,
            ...propStyles,
          }}
          {...restProps}
        />
      );
    };
  };

export default styled;
