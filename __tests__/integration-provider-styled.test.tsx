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

  it('supports logical block and inline aliases in styled components with provider', () => {
    const StyledBox = styled(View)`
      m-block-8
      mbs-4
      mbe-6
      m-inline-10
      m-inline-start-2
      m-inline-end-3
      p-block-12
      pbs-14
      pbe-16
      p-inline-18
      p-inline-start-20
      p-inline-end-22
      border-block-color-blue-500
      border-block-start-color-red-500
      border-block-end-color-green-500
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
    expect(style.marginBlock).toBe(8);
    expect(style.marginVertical).toBe(8);
    expect(style.marginBlockStart).toBe(4);
    expect(style.marginTop).toBe(4);
    expect(style.marginBlockEnd).toBe(6);
    expect(style.marginBottom).toBe(6);
    expect(style.marginInline).toBe(10);
    expect(style.marginHorizontal).toBe(10);
    expect(style.marginInlineStart).toBe(2);
    expect(style.marginStart).toBe(2);
    expect(style.marginInlineEnd).toBe(3);
    expect(style.marginEnd).toBe(3);
    expect(style.paddingBlock).toBe(12);
    expect(style.paddingVertical).toBe(12);
    expect(style.paddingBlockStart).toBe(14);
    expect(style.paddingTop).toBe(14);
    expect(style.paddingBlockEnd).toBe(16);
    expect(style.paddingBottom).toBe(16);
    expect(style.paddingInline).toBe(18);
    expect(style.paddingHorizontal).toBe(18);
    expect(style.paddingInlineStart).toBe(20);
    expect(style.paddingStart).toBe(20);
    expect(style.paddingInlineEnd).toBe(22);
    expect(style.paddingEnd).toBe(22);
    expect(style.borderBlockColor).toBe('#3B82F6');
    expect(style.borderTopColor).toBe('#EF4444');
    expect(style.borderBottomColor).toBe('#10B981');
    expect(style.borderBlockStartColor).toBe('#EF4444');
    expect(style.borderBlockEndColor).toBe('#10B981');
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

  it('applies provider class aliases in styled components within provider context', () => {
    const StyledBox = styled(View)`
      primaryButton
      buttons.secondary
      rounded
    `;

    const tree = renderInAct(
      <TWRNProvider
        theme={{
          classes: {
            primaryButton: 'bg-blue-500 p-2',
            buttons: {secondary: 'bg-gray-200 p-3'},
          },
          styles: {rounded: {borderRadius: 8}},
        }}>
        <StyledBox testID="box" />
      </TWRNProvider>,
    );

    const box = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    const style = StyleSheet.flatten(box?.props.style);
    expect(style.backgroundColor).toBe('#E5E7EB');
    expect(style.padding).toBe(3);
    expect(style.borderRadius).toBe(8);
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
