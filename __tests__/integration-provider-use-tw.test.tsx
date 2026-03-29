import React from 'react';
import {Platform} from 'react-native';
import {act} from 'react-test-renderer';
import {TWRNProvider, useTW} from '../index';
import {mockWindowDimensions, renderInAct, unmountInAct} from '../test-utils';

describe('integration: TWRNProvider + useTW', () => {
  beforeEach(() => {
    mockWindowDimensions();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('resolves mode-specific utilities from provider mode', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead(tw('bg-white dark:bg-black'));
      }, [tw]);
      return null;
    };

    const lightTree = renderInAct(
      <TWRNProvider theme={{mode: 'light'}}>
        <Probe />
      </TWRNProvider>,
    );
    expect(onRead.mock.calls[0][0].backgroundColor).toBe('white');
    unmountInAct(lightTree);
    onRead.mockClear();

    const darkTree = renderInAct(
      <TWRNProvider theme={{mode: 'dark'}}>
        <Probe />
      </TWRNProvider>,
    );
    expect(onRead.mock.calls[0][0].backgroundColor).toBe('black');
    unmountInAct(darkTree);
  });

  it('updates useTW output when provider mode changes at runtime', async () => {
    const onRead = jest.fn();

    const Probe = () => {
      const {tw, mode} = useTW();
      React.useEffect(() => {
        onRead({
          mode,
          style: tw('bg-white dark:bg-black'),
        });
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

  it('supports flat colors and mode override colors from provider', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead({
          primary: tw('bg-primary'),
          lightToken: tw('color-light'),
        });
      }, [tw]);
      return null;
    };

    const tree = renderInAct(
      <TWRNProvider
        theme={{
          mode: 'dark',
          colors: {
            primary: '#bbbbbb',
            light: '#ededed',
            dark: {primary: '#111111'},
          },
        }}>
        <Probe />
      </TWRNProvider>,
    );
    expect(onRead.mock.calls[0][0].primary.backgroundColor).toBe('#111111');
    expect(onRead.mock.calls[0][0].lightToken.color).toBe('#ededed');
    unmountInAct(tree);
  });

  it('supports logical block and inline aliases inside provider context', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead(
          tw(
            'm-block-8 mbs-4 mbe-6 m-inline-10 ms-2 me-3 p-block-12 pbs-14 pbe-16 p-inline-18 ps-20 pe-22 border-block-color-blue-500 border-bs-color-red-500 border-be-color-green-500',
          ),
        );
      }, [tw]);
      return null;
    };

    const tree = renderInAct(
      <TWRNProvider>
        <Probe />
      </TWRNProvider>,
    );

    const style = onRead.mock.calls[0][0];
    expect(style.marginBlock).toBe(8);
    expect(style.marginVertical).toBe(8);
    expect(style.marginBlockStart).toBe(4);
    expect(style.marginTop).toBe(4);
    expect(style.marginBlockEnd).toBe(6);
    expect(style.marginBottom).toBe(6);
    expect(style.marginInline).toBe(10);
    expect(style.marginHorizontal).toBe(10);
    expect(style.marginStart).toBe(2);
    expect(style.marginEnd).toBe(3);
    expect(style.paddingBlock).toBe(12);
    expect(style.paddingVertical).toBe(12);
    expect(style.paddingBlockStart).toBe(14);
    expect(style.paddingTop).toBe(14);
    expect(style.paddingBlockEnd).toBe(16);
    expect(style.paddingBottom).toBe(16);
    expect(style.paddingInline).toBe(18);
    expect(style.paddingHorizontal).toBe(18);
    expect(style.paddingStart).toBe(20);
    expect(style.paddingEnd).toBe(22);
    expect(style.borderBlockColor).toBe('#3B82F6');
    expect(style.borderTopColor).toBe('#EF4444');
    expect(style.borderBottomColor).toBe('#10B981');
    expect(style.borderBlockStartColor).toBe('#EF4444');
    expect(style.borderBlockEndColor).toBe('#10B981');
    unmountInAct(tree);
  });

  it('supports custom provider styles and nested custom styles', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead(tw('card groups.alert'));
      }, [tw]);
      return null;
    };

    const tree = renderInAct(
      <TWRNProvider
        theme={{
          styles: {
            card: {padding: 12},
            groups: {alert: {borderWidth: 2}},
          },
        }}>
        <Probe />
      </TWRNProvider>,
    );
    expect(onRead.mock.calls[0][0].padding).toBe(12);
    expect(onRead.mock.calls[0][0].borderWidth).toBe(2);
    unmountInAct(tree);
  });

  it('supports provider class aliases and nested aliases inside provider context', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead(tw('primaryButton buttons.secondary rounded'));
      }, [tw]);
      return null;
    };

    const tree = renderInAct(
      <TWRNProvider
        theme={{
          classes: {
            primaryButton: 'bg-blue-500 p-2',
            buttons: {secondary: 'bg-gray-200 p-3'},
          },
          styles: {rounded: {borderRadius: 8}},
        }}>
        <Probe />
      </TWRNProvider>,
    );
    expect(onRead.mock.calls[0][0].backgroundColor).toBe('#E5E7EB');
    expect(onRead.mock.calls[0][0].padding).toBe(3);
    expect(onRead.mock.calls[0][0].borderRadius).toBe(8);
    unmountInAct(tree);
  });

  it('ignores circular provider class aliases without breaking other utilities', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead(tw('loopA mt-8'));
      }, [tw]);
      return null;
    };

    const tree = renderInAct(
      <TWRNProvider
        theme={{
          classes: {
            loopA: 'loopB',
            loopB: 'loopA',
          },
        }}>
        <Probe />
      </TWRNProvider>,
    );
    expect(onRead.mock.calls[0][0].marginTop).toBe(8);
    unmountInAct(tree);
  });

  it('applies platform-prefixed utilities and ignores non-matching ones', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead(tw('ios:mt-8 android:mt-12'));
      }, [tw]);
      return null;
    };
    const tree = renderInAct(
      <TWRNProvider>
        <Probe />
      </TWRNProvider>,
    );
    const expectedMarginTop = Platform.OS === 'ios' ? 8 : 12;
    expect(onRead.mock.calls[0][0].marginTop).toBe(expectedMarginTop);
    unmountInAct(tree);
  });

  it('uses provider conversion factors for wppx/hppx and helper outputs', () => {
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

  it('keeps fail-soft behavior for invalid utilities inside provider context', () => {
    const onRead = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead(tw('foo-bar mt-8 mt-abc'));
      }, [tw]);
      return null;
    };
    const tree = renderInAct(
      <TWRNProvider>
        <Probe />
      </TWRNProvider>,
    );
    const style = onRead.mock.calls[0][0];
    expect(style.marginTop).toBe(8);
    expect(warnSpy).toHaveBeenCalled();
    expect(Number.isNaN(style.marginTop)).toBe(false);
    unmountInAct(tree);
  });

  it('parses basic utility styles from README examples in provider context', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead(tw('bg-blue-500 font-bold mt-8'));
      }, [tw]);
      return null;
    };
    const tree = renderInAct(
      <TWRNProvider>
        <Probe />
      </TWRNProvider>,
    );
    const style = onRead.mock.calls[0][0];
    expect(style.backgroundColor).toBe('#3B82F6');
    expect(style.fontWeight).toBe('700');
    expect(style.marginTop).toBe(8);
    unmountInAct(tree);
  });

  it('resolves utility conflicts by last class in provider context', () => {
    const onRead = jest.fn();
    const Probe = () => {
      const {tw} = useTW();
      React.useEffect(() => {
        onRead(tw('mt-4 mt-8'));
      }, [tw]);
      return null;
    };
    const tree = renderInAct(
      <TWRNProvider>
        <Probe />
      </TWRNProvider>,
    );
    expect(onRead.mock.calls[0][0].marginTop).toBe(8);
    unmountInAct(tree);
  });

  it('does not warn in production mode for invalid utilities in provider context', () => {
    const prev = process.env.NODE_ENV;
    try {
      process.env.NODE_ENV = 'production';
      const onRead = jest.fn();
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const Probe = () => {
        const {tw} = useTW();
        React.useEffect(() => {
          onRead(tw('foo-bar mt-8'));
        }, [tw]);
        return null;
      };
      const tree = renderInAct(
        <TWRNProvider>
          <Probe />
        </TWRNProvider>,
      );
      expect(onRead.mock.calls[0][0].marginTop).toBe(8);
      expect(warnSpy).not.toHaveBeenCalled();
      unmountInAct(tree);
    } finally {
      process.env.NODE_ENV = prev;
    }
  });
});
