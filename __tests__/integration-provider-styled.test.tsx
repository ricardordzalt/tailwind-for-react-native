import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {act} from 'react-test-renderer';
import {styled, TWRNProvider} from '../index';
import {mockWindowDimensions, renderInAct, unmountInAct} from '../test-utils';

describe('integration: TWRNProvider + styled', () => {
  beforeEach(() => {
    mockWindowDimensions();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('applies mode-specific utility classes from provider mode', () => {
    const StyledBox = styled(View)`
      bg-white
      dark:bg-black
    `;

    const lightTree = renderInAct(
      <TWRNProvider theme={{mode: 'light'}}>
        <StyledBox testID="box" />
      </TWRNProvider>,
    );
    const lightBox = lightTree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    expect(StyleSheet.flatten(lightBox?.props.style).backgroundColor).toBe(
      'white',
    );
    unmountInAct(lightTree);

    const darkTree = renderInAct(
      <TWRNProvider theme={{mode: 'dark'}}>
        <StyledBox testID="box" />
      </TWRNProvider>,
    );
    const darkBox = darkTree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    expect(StyleSheet.flatten(darkBox?.props.style).backgroundColor).toBe(
      'black',
    );
    unmountInAct(darkTree);
  });

  it('updates styled output when provider theme.mode changes at runtime', async () => {
    const StyledBox = styled(View)`
      bg-white
      dark:bg-black
    `;

    const App = () => {
      const [mode, setMode] = React.useState<'light' | 'dark'>('light');
      React.useEffect(() => {
        setMode('dark');
      }, []);
      return (
        <TWRNProvider theme={{mode}}>
          <StyledBox testID="box" />
        </TWRNProvider>
      );
    };

    const tree = renderInAct(<App />);
    await act(async () => {
      await Promise.resolve();
    });
    const box = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    expect(StyleSheet.flatten(box?.props.style).backgroundColor).toBe('black');
    unmountInAct(tree);
  });

  it('supports flat and mode override colors from provider in styled components', () => {
    const StyledPrimary = styled(View)`
      bg-primary
    `;
    const StyledFlat = styled(Text)`
      color-light
    `;

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
        <StyledPrimary testID="primary" />
        <StyledFlat testID="flat">ok</StyledFlat>
      </TWRNProvider>,
    );

    const primary = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'primary');
    const flat = tree.root
      .findAllByType(Text)
      .find(node => node.props.testID === 'flat');

    expect(StyleSheet.flatten(primary?.props.style).backgroundColor).toBe(
      '#111111',
    );
    expect(StyleSheet.flatten(flat?.props.style).color).toBe('#ededed');
    unmountInAct(tree);
  });

  it('applies provider custom styles and nested custom styles in styled', () => {
    const StyledBox = styled(View)`
      card
      groups.alert
    `;

    const tree = renderInAct(
      <TWRNProvider
        theme={{
          styles: {
            card: {padding: 12},
            groups: {alert: {borderWidth: 2}},
          },
        }}>
        <StyledBox testID="box" />
      </TWRNProvider>,
    );

    const box = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    const style = StyleSheet.flatten(box?.props.style);
    expect(style.padding).toBe(12);
    expect(style.borderWidth).toBe(2);
    unmountInAct(tree);
  });

  it('ignores non-matching platform-prefixed classes in styled', () => {
    const StyledBox = styled(View)`
      ios:mt-8
      android:mt-12
    `;

    const tree = renderInAct(
      <TWRNProvider>
        <StyledBox testID="box" />
      </TWRNProvider>,
    );
    const box = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    const style = StyleSheet.flatten(box?.props.style);
    const expectedMarginTop = Platform.OS === 'ios' ? 8 : 12;
    expect(style.marginTop).toBe(expectedMarginTop);
    unmountInAct(tree);
  });

  it('keeps prop style precedence over styled classes with provider context', () => {
    const StyledText = styled(Text)`
      font-size-16
      color-blue-500
    `;

    const tree = renderInAct(
      <TWRNProvider>
        <StyledText testID="txt" style={[{color: '#222222'}, {fontSize: 28}]}>
          hello
        </StyledText>
      </TWRNProvider>,
    );
    const txt = tree.root
      .findAllByType(Text)
      .find(node => node.props.testID === 'txt');
    const style = StyleSheet.flatten(txt?.props.style);
    expect(style.color).toBe('#222222');
    expect(style.fontSize).toBe(28);
    unmountInAct(tree);
  });

  it('creates styled component with utility style + prop style', () => {
    const StyledText = styled(Text)`
      font-size-16
      color-blue-500
    `;
    const tree = renderInAct(
      <TWRNProvider>
        <StyledText testID="txt" style={{opacity: 0.5}}>
          hello
        </StyledText>
      </TWRNProvider>,
    );
    const txt = tree.root
      .findAllByType(Text)
      .find(node => node.props.testID === 'txt');
    const style = StyleSheet.flatten(txt?.props.style);
    expect(style.fontSize).toBe(16);
    expect(style.color).toBe('#3B82F6');
    expect(style.opacity).toBe(0.5);
    unmountInAct(tree);
  });

  it('supports template interpolations with props inside provider', () => {
    const StyledBox = styled(View)<{size: number}>`
      w-${({size}) => size}
      h-${({size}) => size}
    `;
    const tree = renderInAct(
      <TWRNProvider>
        <StyledBox testID="box" size={24} />
      </TWRNProvider>,
    );
    const box = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    const style = StyleSheet.flatten(box?.props.style);
    expect(style.width).toBe(24);
    expect(style.height).toBe(24);
    unmountInAct(tree);
  });
});
