import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {act} from 'react-test-renderer';
import {styled, TWRNProvider} from '../index';
import {mockWindowDimensions, renderInAct, unmountInAct} from '../test-utils';

describe('styled', () => {
  beforeEach(() => {
    mockWindowDimensions();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates a component with tailwind style + prop style', () => {
    const StyledText = styled(Text)`
      font-size-16
      color-blue-500
    `;

    const tree = renderInAct(
      <TWRNProvider>
        <StyledText style={{opacity: 0.5}}>Hello</StyledText>
      </TWRNProvider>,
    );

    const textNode = tree.root.findByType(Text);
    const style = textNode.props.style;
    expect(style.fontSize).toBe(16);
    expect(style.color).toBe('#3B82F6');
    expect(style.opacity).toBe(0.5);
    unmountInAct(tree);
  });

  it('lets object prop style override styled utility values', () => {
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

  it('lets array prop style override styled utility values', () => {
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

  it('supports template interpolations with props', () => {
    const StyledBox = styled(View)<{size: number}>`
      w-${({size}) => size}
      h-${({size}) => size}
    `;

    const tree = renderInAct(
      <TWRNProvider>
        <StyledBox size={24} />
      </TWRNProvider>,
    );

    const viewNode = tree.root.findByType(View);
    const style = viewNode.props.style;
    expect(style.width).toBe(24);
    expect(style.height).toBe(24);
    unmountInAct(tree);
  });

  it('applies mode-specific classes from provider mode', () => {
    const StyledBox = styled(View)`
      bg-white
      dark:bg-black
    `;
    const tree = renderInAct(
      <TWRNProvider theme={{mode: 'dark'}}>
        <StyledBox testID="box" />
      </TWRNProvider>,
    );
    const box = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    expect(StyleSheet.flatten(box?.props.style).backgroundColor).toBe('black');
    unmountInAct(tree);
  });

  it('updates styled output when provider mode changes at runtime', async () => {
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

  it('supports provider colors flat and mode override', () => {
    const StyledPrimary = styled(View)`
      bg-primary
    `;
    const tree = renderInAct(
      <TWRNProvider
        theme={{
          mode: 'dark',
          colors: {
            primary: '#bbbbbb',
            dark: {primary: '#111111'},
          },
        }}>
        <StyledPrimary testID="box" />
      </TWRNProvider>,
    );
    const box = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    expect(StyleSheet.flatten(box?.props.style).backgroundColor).toBe('#111111');
    unmountInAct(tree);
  });

  it('supports provider custom styles and nested styles', () => {
    const StyledBox = styled(View)`
      card
      groups.alert
    `;
    const tree = renderInAct(
      <TWRNProvider
        theme={{styles: {card: {padding: 12}, groups: {alert: {borderWidth: 2}}}}}>
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

  it('applies platform-prefixed classes according to platform', () => {
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
});
