import {Platform} from 'react-native';
import React from 'react';
import {act} from 'react-test-renderer';
import {TWRNProvider, useTW} from '../index';
import {mockWindowDimensions, readTw} from '../test-utils';
import {renderInAct, unmountInAct} from '../test-utils';

describe('useTW', () => {
  beforeEach(() => {
    mockWindowDimensions();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('parses basic utility styles from README examples', () => {
    const style = readTw({className: 'bg-blue-500 font-bold mt-8'});
    expect(style.backgroundColor).toBe('#3B82F6');
    expect(style.fontWeight).toBe('700');
    expect(style.marginTop).toBe(8);
  });

  it('respects dark: modifier by mode', () => {
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

  it('applies platform-prefixed styles only for current platform', () => {
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

  it('supports provider custom styles and nested custom styles', () => {
    const style = readTw({
      className: 'card groups.alert',
      theme: {
        styles: {
          card: {padding: 12},
          groups: {alert: {borderWidth: 2}},
        },
      },
    });
    expect(style.padding).toBe(12);
    expect(style.borderWidth).toBe(2);
  });

  it('supports flat colors and mode overrides from provider', () => {
    const style = readTw({
      className: 'bg-primary color-light',
      theme: {
        mode: 'dark',
        colors: {
          primary: '#bbbbbb',
          light: '#ededed',
          dark: {primary: '#111111'},
        },
      },
    });
    expect(style.backgroundColor).toBe('#111111');
    expect(style.color).toBe('#ededed');
  });

  it('updates output when provider mode changes at runtime', async () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw, mode} = useTW();
      React.useEffect(() => {
        onRead({mode, style: tw('bg-white dark:bg-black')});
      }, [mode, tw]);
      return null;
    };
    const App = () => {
      const [mode, setMode] = React.useState<'light' | 'dark'>('light');
      React.useEffect(() => {
        setMode('dark');
      }, []);
      return (
        <TWRNProvider theme={{mode}}>
          <Probe />
        </TWRNProvider>
      );
    };
    const tree = renderInAct(<App />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(onRead.mock.calls[0][0].style.backgroundColor).toBe('white');
    expect(
      onRead.mock.calls[onRead.mock.calls.length - 1][0].style.backgroundColor,
    ).toBe('black');
    unmountInAct(tree);
  });

  it('uses conversion factors for both tw values and helper functions', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw, wppx, hppx} = useTW();
      React.useEffect(() => {
        onRead({
          tw: tw('w-wppx(50) h-hppx(25)'),
          helperWidth: wppx(50),
          helperHeight: hppx(25),
        });
      }, [tw, wppx, hppx]);
      return null;
    };
    const tree = renderInAct(
      <TWRNProvider theme={{wpFactorConversion: 3.6, hpFactorConversion: 8}}>
        <Probe />
      </TWRNProvider>,
    );
    expect(onRead.mock.calls[0][0].tw.width).toBe(50);
    expect(onRead.mock.calls[0][0].tw.height).toBe(25);
    expect(onRead.mock.calls[0][0].helperWidth).toBe(50);
    expect(onRead.mock.calls[0][0].helperHeight).toBe(25);
    unmountInAct(tree);
  });
});
