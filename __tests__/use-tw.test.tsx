import {Platform} from 'react-native';
import React from 'react';
import {useTW} from '../index';
import {mockWindowDimensions, readTwWithoutProvider} from '../test-utils';
import {renderInAct, unmountInAct} from '../test-utils';
import {COLORS} from '../src/constants/colors';

describe('useTW', () => {
  beforeEach(() => {
    mockWindowDimensions();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('parses basic utility styles from README examples', () => {
    const style = readTwWithoutProvider({className: 'bg-blue-500 font-bold mt-8'});
    expect(style.backgroundColor).toBe(COLORS['blue-500']);
    expect(style.fontWeight).toBe('700');
    expect(style.marginTop).toBe(8);
  });

  it('supports v4 palette tokens with 950 scale', () => {
    const style = readTwWithoutProvider({className: 'bg-olive-950 color-taupe-400'});
    expect(style.backgroundColor).toBe(COLORS['olive-950']);
    expect(style.color).toBe(COLORS['taupe-400']);
  });

  it('ignores dark: modifier in default light mode without provider', () => {
    const style = readTwWithoutProvider({className: 'bg-white dark:bg-black'});
    expect(style.backgroundColor).toBe('white');
  });

  it('applies platform-prefixed styles only for current platform', () => {
    const style = readTwWithoutProvider({className: 'ios:mt-8 android:mt-12'});
    const expectedMarginTop = Platform.OS === 'ios' ? 8 : 12;
    expect(style.marginTop).toBe(expectedMarginTop);
  });

  it('ignores non-matching platform classes', () => {
    const className = Platform.OS === 'ios' ? 'android:mt-12' : 'ios:mt-8';
    const style = readTwWithoutProvider({className});
    expect(style.marginTop).toBeUndefined();
  });

  it('resolves utility conflicts by last class', () => {
    const style = readTwWithoutProvider({className: 'mt-4 mt-8'});
    expect(style.marginTop).toBe(8);
  });

  it('supports percentage, auto, hex, wp/hp and wppx/hppx values', () => {
    const percentageStyle = readTwWithoutProvider({className: 'w-70%'});
    const autoStyle = readTwWithoutProvider({className: 'l-auto'});
    const hexStyle = readTwWithoutProvider({className: 'color-#fff'});
    const wpStyle = readTwWithoutProvider({className: 'w-wp(50)'});
    const hpStyle = readTwWithoutProvider({className: 'h-hp(25)'});
    const wppxStyle = readTwWithoutProvider({className: 'w-wppx(50)'});
    const hppxStyle = readTwWithoutProvider({className: 'h-hppx(25)'});

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
    const style = readTwWithoutProvider({className: 'foo-bar mt-8'});
    expect(style.marginTop).toBe(8);
    expect(warnSpy).toHaveBeenCalled();
    expect(warnSpy.mock.calls[0][0]).toContain('Ignored invalid style "foo-bar"');
  });

  it('warns for invalid numeric values and avoids NaN styles', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const style = readTwWithoutProvider({className: 'mt-abc'});
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

      const style = readTwWithoutProvider({className: 'foo-bar mt-8'});
      expect(style.marginTop).toBe(8);
      expect(warnSpy).not.toHaveBeenCalled();
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
    }
  });

  it('supports logical block and inline aliases for margin, padding and border colors', () => {
    const style = readTwWithoutProvider({
      className:
        'm-block-8 mbs-4 mbe-6 m-inline-10 ms-2 me-3 p-block-12 pbs-14 pbe-16 p-inline-18 ps-20 pe-22 border-block-color-blue-500 border-bs-color-red-500 border-be-color-green-500',
    });

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
    expect(style.borderBlockColor).toBe(COLORS['blue-500']);
    expect(style.borderTopColor).toBe(COLORS['red-500']);
    expect(style.borderBottomColor).toBe(COLORS['green-500']);
    expect(style.borderBlockStartColor).toBe(COLORS['red-500']);
    expect(style.borderBlockEndColor).toBe(COLORS['green-500']);
  });

  describe('shadow presets', () => {
    // Platform.select is evaluated at module load time.
    // Jest runs as 'ios' by default, so iOS props are present and elevation is undefined.
    it('returns iOS shadow props for shadow-N (default jest platform: ios)', () => {
      const style = readTwWithoutProvider({className: 'shadow-4'});
      expect(style.shadowColor).toBe('#000');
      expect(style.shadowOffset).toEqual({width: 0, height: 2});
      expect(style.shadowOpacity).toBeCloseTo(0.25, 1);
      expect(style.shadowRadius).toBeCloseTo(2.62, 1);
      expect(style.elevation).toBeUndefined();
    });

    it('returns no shadow for shadow-0 and shadow-none', () => {
      const style0 = readTwWithoutProvider({className: 'shadow-0'});
      const styleNone = readTwWithoutProvider({className: 'shadow-none'});
      // shadowColor is always present; iOS props are 0; elevation is Android-only
      expect(style0.shadowColor).toBe('#000');
      expect(style0.shadowOffset).toEqual({width: 0, height: 0});
      expect(style0.shadowOpacity).toBe(0);
      expect(style0.shadowRadius).toBe(0);
      expect(styleNone.shadowColor).toBe('#000');
      expect(styleNone.shadowOffset).toEqual({width: 0, height: 0});
    });

    it('returns maximum preset for shadow-24', () => {
      const style = readTwWithoutProvider({className: 'shadow-24'});
      expect(style.shadowColor).toBe('#000');
      expect(style.shadowOffset).toEqual({width: 0, height: 12});
      expect(style.shadowOpacity).toBeCloseTo(0.6, 1);
      expect(style.shadowRadius).toBeCloseTo(16, 0);
      expect(style.elevation).toBeUndefined();
    });

    it('supports directional shadow-t (top) with negative height offset', () => {
      const style = readTwWithoutProvider({className: 'shadow-t-4'});
      expect(style.shadowOffset).toEqual({width: 0, height: -2});
      expect(style.elevation).toBeUndefined();
    });

    it('supports directional shadow-b (bottom) same as default', () => {
      const base = readTwWithoutProvider({className: 'shadow-4'});
      const bottom = readTwWithoutProvider({className: 'shadow-b-4'});
      expect(bottom).toEqual(base);
    });

    it('supports directional shadow-l (left) with negative width offset', () => {
      const style = readTwWithoutProvider({className: 'shadow-l-4'});
      expect(style.shadowOffset).toEqual({width: -2, height: 0});
      expect(style.elevation).toBeUndefined();
    });

    it('supports directional shadow-r (right) with positive width offset', () => {
      const style = readTwWithoutProvider({className: 'shadow-r-4'});
      expect(style.shadowOffset).toEqual({width: 2, height: 0});
      expect(style.elevation).toBeUndefined();
    });

    it('supports axis shadow-x (horizontal) same as shadow-r', () => {
      const right = readTwWithoutProvider({className: 'shadow-r-4'});
      const x = readTwWithoutProvider({className: 'shadow-x-4'});
      expect(x).toEqual(right);
    });

    it('supports axis shadow-y (vertical) same as default', () => {
      const base = readTwWithoutProvider({className: 'shadow-4'});
      const y = readTwWithoutProvider({className: 'shadow-y-4'});
      expect(y).toEqual(base);
    });

    it('allows shadow color override with shadow-<color> alongside preset', () => {
      const style = readTwWithoutProvider({className: 'shadow-4 shadow-red-500'});
      expect(style.shadowColor).toBe(COLORS['red-500']);
      expect(style.shadowOffset).toEqual({width: 0, height: 2});
      expect(style.shadowOpacity).toBeCloseTo(0.25, 1);
      expect(style.elevation).toBeUndefined();
    });

    it('supports shadow color with hex value', () => {
      const style = readTwWithoutProvider({className: 'shadow-4 shadow-#ff0000'});
      expect(style.shadowColor).toBe('#ff0000');
      expect(style.elevation).toBeUndefined();
    });
  });

  it('uses default conversion factors for both tw values and helper functions', () => {
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
    const tree = renderInAct(<Probe />);
    expect(onRead.mock.calls[0][0].tw.width).toBe(50);
    expect(onRead.mock.calls[0][0].tw.height).toBe(25);
    expect(onRead.mock.calls[0][0].helperWidth).toBe(50);
    expect(onRead.mock.calls[0][0].helperHeight).toBe(25);
    unmountInAct(tree);
  });
});
