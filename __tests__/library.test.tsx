import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import renderer, {act, ReactTestRenderer} from 'react-test-renderer';
import {styled, TWRNProvider, useTW} from '../index';

type CaptureProps = {
  onRead: (value: ReturnType<ReturnType<typeof useTW>['tw']>) => void;
  className: string;
};

const TWCapture = ({onRead, className}: CaptureProps) => {
  const {tw} = useTW();
  React.useEffect(() => {
    onRead(tw(className));
  }, [className, onRead, tw]);
  return null;
};

const renderInAct = (node: React.ReactElement): ReactTestRenderer => {
  let tree: ReactTestRenderer | undefined;
  act(() => {
    tree = renderer.create(node);
  });
  return tree as ReactTestRenderer;
};

const unmountInAct = (tree: ReactTestRenderer) => {
  act(() => {
    tree.unmount();
  });
};

const readTw = ({
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

describe('tailwind-for-react-native public API', () => {
  beforeEach(() => {
    jest.spyOn(require('react-native'), 'useWindowDimensions').mockReturnValue({
      width: 360,
      height: 800,
      scale: 1,
      fontScale: 1,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('useTW parses basic utility styles from README examples', () => {
    const style = readTw({className: 'bg-blue-500 font-bold mt-8'});
    expect(style.backgroundColor).toBe('#3B82F6');
    expect(style.fontWeight).toBe('700');
    expect(style.marginTop).toBe(8);
  });

  it('useTW respects dark: modifier by mode', () => {
    const lightStyle = readTw({
      className: 'bg-white dark:bg-black',
      theme: {mode: 'light'},
    });
    const darkStyle = readTw({
      className: 'bg-white dark:bg-black',
      theme: {mode: 'dark'},
    });
    expect(lightStyle.backgroundColor).toBe('white');
    expect(darkStyle.backgroundColor).toBe('black');
  });

  it('useTW applies platform-prefixed styles only for current platform', () => {
    const style = readTw({className: 'ios:mt-8 android:mt-12'});
    const expectedMarginTop = Platform.OS === 'ios' ? 8 : 12;
    expect(style.marginTop).toBe(expectedMarginTop);
  });

  it('ignores non-matching platform classes', () => {
    const className = Platform.OS === 'ios' ? 'android:mt-12' : 'ios:mt-8';
    const style = readTw({className});
    expect(style.marginTop).toBeUndefined();
  });

  it('resolves utility conflicts by last class', () => {
    const style = readTw({className: 'mt-4 mt-8'});
    expect(style.marginTop).toBe(8);
  });

  it('supports percentage, auto, hex, wp/hp and wppx/hppx values', () => {
    const percentageStyle = readTw({className: 'w-70%'});
    const autoStyle = readTw({className: 'l-auto'});
    const hexStyle = readTw({className: 'color-#fff'});
    const wpStyle = readTw({className: 'w-wp(50)'});
    const hpStyle = readTw({className: 'h-hp(25)'});
    const wppxStyle = readTw({
      className: 'w-wppx(50)',
      theme: {wpFactorConversion: 3.6},
    });
    const hppxStyle = readTw({
      className: 'h-hppx(25)',
      theme: {hpFactorConversion: 8},
    });

    expect(percentageStyle.width).toBe('70%');
    expect(autoStyle.left).toBe('auto');
    expect(hexStyle.color).toBe('#fff');
    expect(wpStyle.width).toBe(180);
    expect(hpStyle.height).toBe(200);
    expect(wppxStyle.width).toBe(50);
    expect(hppxStyle.height).toBe(25);
  });

  it('supports flat custom colors including keys named light and dark', () => {
    const style = readTw({
      className: 'bg-light color-dark',
      theme: {
        colors: {
          light: '#ededed',
          dark: '#121212',
        },
      },
    });

    expect(style.backgroundColor).toBe('#ededed');
    expect(style.color).toBe('#121212');
  });

  it('supports mode overrides when colors.light and colors.dark are objects', () => {
    const lightStyle = readTw({
      className: 'bg-primary',
      theme: {
        mode: 'light',
        colors: {
          primary: '#bbbbbb',
          light: {primary: '#f5f5f5'},
          dark: {primary: '#111111'},
        },
      },
    });

    const darkStyle = readTw({
      className: 'bg-primary',
      theme: {
        mode: 'dark',
        colors: {
          primary: '#bbbbbb',
          light: {primary: '#f5f5f5'},
          dark: {primary: '#111111'},
        },
      },
    });

    expect(lightStyle.backgroundColor).toBe('#f5f5f5');
    expect(darkStyle.backgroundColor).toBe('#111111');
  });

  it('styled creates a component with tailwind style + prop style', () => {
    const StyledText = styled(Text)`
      font-size-16
      color-blue-500
    `;

    const tree = renderInAct(
      <TWRNProvider>
        <StyledText style={{opacity: 0.5}}>Hello</StyledText>
      </TWRNProvider>
    );

    const textNode = tree.root.findByType(Text);
    const style = textNode.props.style;
    expect(style.fontSize).toBe(16);
    expect(style.color).toBe('#3B82F6');
    expect(style.opacity).toBe(0.5);
    unmountInAct(tree);
  });

  it('styled lets object prop style override styled utility values', () => {
    const StyledText = styled(Text)`
      font-size-16
      color-blue-500
    `;

    const tree = renderInAct(
      <TWRNProvider>
        <StyledText style={{fontSize: 22, color: '#111111'}}>Hello</StyledText>
      </TWRNProvider>,
    );

    const textNode = tree.root.findByType(Text);
    const style = textNode.props.style;
    expect(style.fontSize).toBe(22);
    expect(style.color).toBe('#111111');
    unmountInAct(tree);
  });

  it('styled lets array prop style override styled utility values', () => {
    const StyledText = styled(Text)`
      font-size-16
      color-blue-500
    `;

    const tree = renderInAct(
      <TWRNProvider>
        <StyledText
          style={[{fontSize: 18, color: '#222222'}, {fontSize: 26}]}>
          Hello
        </StyledText>
      </TWRNProvider>,
    );

    const textNode = tree.root.findByType(Text);
    const style = StyleSheet.flatten(textNode.props.style);
    expect(style.fontSize).toBe(26);
    expect(style.color).toBe('#222222');
    unmountInAct(tree);
  });

  it('styled supports template interpolations with props', () => {
    const StyledBox = styled(View)<{size: number}>`
      w-${({size}) => size}
      h-${({size}) => size}
    `;

    const tree = renderInAct(
      <TWRNProvider>
        <StyledBox size={24} />
      </TWRNProvider>
    );

    const viewNode = tree.root.findByType(View);
    const style = viewNode.props.style;
    expect(style.width).toBe(24);
    expect(style.height).toBe(24);
    unmountInAct(tree);
  });

  it('toggleMode updates mode-sensitive styles at runtime', async () => {
    const onRead = jest.fn();
    const onToggleReady = jest.fn();
    const ToggleProbe = () => {
      const {tw, mode, toggleMode} = useTW();
      React.useEffect(() => {
        onToggleReady(toggleMode);
      }, [toggleMode]);
      React.useEffect(() => {
        const style = tw('bg-white dark:bg-black');
        onRead({mode, backgroundColor: style.backgroundColor});
      }, [mode, tw]);
      return null;
    };

    const tree = renderInAct(
      <TWRNProvider theme={{mode: 'light'}}>
        <ToggleProbe />
      </TWRNProvider>,
    );

    expect(onRead.mock.calls[0][0]).toEqual({
      mode: 'light',
      backgroundColor: 'white',
    });
    const toggleMode = onToggleReady.mock.calls[0][0];
    act(() => {
      toggleMode();
    });

    await act(async () => {
      await Promise.resolve();
    });
    expect(onRead.mock.calls[onRead.mock.calls.length - 1][0]).toEqual({
      mode: 'dark',
      backgroundColor: 'black',
    });
    unmountInAct(tree);
  });

  it('updates mode when provider theme.mode prop changes at runtime', async () => {
    const onRead = jest.fn();
    const ModeFromParent = () => {
      const [mode, setMode] = React.useState<'light' | 'dark'>('light');
      React.useEffect(() => {
        setMode('dark');
      }, []);
      return (
        <TWRNProvider theme={{mode}}>
          <TWCapture onRead={onRead} className="bg-white dark:bg-black" />
        </TWRNProvider>
      );
    };

    const tree = renderInAct(<ModeFromParent />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(onRead.mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(onRead.mock.calls[0][0].backgroundColor).toBe('white');
    expect(
      onRead.mock.calls[onRead.mock.calls.length - 1][0].backgroundColor,
    ).toBe('black');
    unmountInAct(tree);
  });

  it('warns for invalid utilities in non-production and does not break valid ones', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const style = readTw({className: 'foo-bar mt-8'});
    expect(style.marginTop).toBe(8);
    expect(warnSpy).toHaveBeenCalled();
    expect(warnSpy.mock.calls[0][0]).toContain('Ignored invalid style "foo-bar"');
  });

  it('warns for invalid numeric values and avoids NaN styles', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const style = readTw({className: 'mt-abc'});
    expect(style.marginTop).toBeUndefined();
    expect(Number.isNaN(style.marginTop)).toBe(false);
    expect(warnSpy).toHaveBeenCalled();
    expect(warnSpy.mock.calls[0][0]).toContain('invalid numeric value');
  });

  it('does not warn in production mode for invalid utilities', () => {
    const previousNodeEnv = process.env.NODE_ENV;
    try {
      process.env.NODE_ENV = 'production';
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const style = readTw({className: 'foo-bar mt-8'});
      expect(style.marginTop).toBe(8);
      expect(warnSpy).not.toHaveBeenCalled();
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
    }
  });
});
