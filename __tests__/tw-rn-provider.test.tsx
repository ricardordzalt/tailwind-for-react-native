import React from 'react';
import {TWRNProvider, useTW} from '../index';
import {
  mockWindowDimensions,
  readTw,
  renderInAct,
  TWCapture,
  unmountInAct,
} from '../test-utils';
import {act} from 'react-test-renderer';

describe('TWRNProvider', () => {
  beforeEach(() => {
    mockWindowDimensions();
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
});
