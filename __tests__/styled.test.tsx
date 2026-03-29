import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {styled} from '../index';
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

    const tree = renderInAct(<StyledText style={{opacity: 0.5}}>Hello</StyledText>);

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
      <StyledText style={{fontSize: 22, color: '#111111'}}>Hello</StyledText>,
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
      <StyledText style={[{fontSize: 18, color: '#222222'}, {fontSize: 26}]}>
        Hello
      </StyledText>,
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

    const tree = renderInAct(<StyledBox size={24} />);

    const viewNode = tree.root.findByType(View);
    const style = viewNode.props.style;
    expect(style.width).toBe(24);
    expect(style.height).toBe(24);
    unmountInAct(tree);
  });

  it('parses utilities separated only by newlines in template literals', () => {
    const StyledBox = styled(View)`bg-blue-500
mt-8`;
    const tree = renderInAct(<StyledBox testID="box" />);
    const box = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    const style = StyleSheet.flatten(box?.props.style);
    expect(style.backgroundColor).toBe('#3B82F6');
    expect(style.marginTop).toBe(8);
    unmountInAct(tree);
  });

  it('supports logical block and inline aliases for margin, padding and border colors', () => {
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

    const tree = renderInAct(<StyledBox testID="box" />);

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

  it('applies platform-prefixed classes according to platform', () => {
    const StyledBox = styled(View)`
      ios:mt-8
      android:mt-12
    `;
    const tree = renderInAct(<StyledBox testID="box" />);
    const box = tree.root
      .findAllByType(View)
      .find(node => node.props.testID === 'box');
    const style = StyleSheet.flatten(box?.props.style);
    const expectedMarginTop = Platform.OS === 'ios' ? 8 : 12;
    expect(style.marginTop).toBe(expectedMarginTop);
    unmountInAct(tree);
  });
});
