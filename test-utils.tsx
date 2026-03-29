import React from 'react';
import renderer, {act, ReactTestRenderer} from 'react-test-renderer';
import {TWRNProvider, useTW} from './index';

type CaptureProps = {
  onRead: (value: ReturnType<ReturnType<typeof useTW>['tw']>) => void;
  className: string;
};

export const TWCapture = ({onRead, className}: CaptureProps) => {
  const {tw} = useTW();
  React.useEffect(() => {
    onRead(tw(className));
  }, [className, onRead, tw]);
  return null;
};

export const renderInAct = (node: React.ReactElement): ReactTestRenderer => {
  let tree: ReactTestRenderer | undefined;
  act(() => {
    tree = renderer.create(node);
  });
  return tree as ReactTestRenderer;
};

export const unmountInAct = (tree: ReactTestRenderer) => {
  act(() => {
    tree.unmount();
  });
};

export const readTw = ({
  className,
  theme,
}: {
  className: string;
  theme?: React.ComponentProps<typeof TWRNProvider>['theme'];
}) => {
  const onRead = jest.fn();
  const tree = renderInAct(
    <TWRNProvider theme={theme}>
      <TWCapture onRead={onRead} className={className} />
    </TWRNProvider>,
  );
  const style = onRead.mock.calls[0][0];
  unmountInAct(tree);
  return style;
};

export const readTwWithoutProvider = ({className}: {className: string}) => {
  const onRead = jest.fn();
  const tree = renderInAct(<TWCapture onRead={onRead} className={className} />);
  const style = onRead.mock.calls[0][0];
  unmountInAct(tree);
  return style;
};

export const mockWindowDimensions = () => {
  jest.spyOn(require('react-native'), 'useWindowDimensions').mockReturnValue({
    width: 360,
    height: 800,
    scale: 1,
    fontScale: 1,
  });
};
