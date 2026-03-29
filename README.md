# tailwind-for-react-native

Utility-first styling for React Native:

- Utility strings with `tw(...)`
- Reusable components with `styled(Component)` template literals
- Optional `TWRNProvider` for runtime mode, custom tokens, aliases, and viewport conversion settings

## Installation

```bash
npm i tailwind-for-react-native
```

or

```bash
yarn add tailwind-for-react-native
```

---

## Quick Start

### 1) Use `styled(...)`

```tsx
import {Pressable, Text, View} from 'react-native';
import {styled} from 'tailwind-for-react-native';

const Button = styled(Pressable)`
  border-radius-8
  p-6
  bg-blue-500
`;

const ButtonText = styled(Text)`
  font-size-16
  color-#fff
`;

const Example = () => (
  <View>
    <Button>
      <ButtonText>Save</ButtonText>
    </Button>
  </View>
);
```

### 2) Use `useTW()`

```tsx
import {View} from 'react-native';
import {useTW} from 'tailwind-for-react-native';

const Example = () => {
  const {tw} = useTW();
  return <View style={tw('bg-blue-500 mt-8')} />;
};
```

`tw(...)` and `styled(...)` work without any provider.  
Use `TWRNProvider` only when you need runtime theme/config.

### 3) Optional: wrap with `TWRNProvider` to extend features

```tsx
import React from 'react';
import {useColorScheme} from 'react-native';
import {TWRNProvider} from 'tailwind-for-react-native';

const App = () => {
  const mode = useColorScheme() === 'dark' ? 'dark' : 'light';
  return (
    <TWRNProvider
      theme={{
        mode,
        colors: {brand: '#2563EB'},
        styles: {card: {padding: 12, borderRadius: 8}},
        classes: {primaryButton: 'bg-brand p-2 border-radius-8'},
      }}>
      {/* app */}
    </TWRNProvider>
  );
};
```

Each `theme` key is optional and independent, so you can pass only what you need:

- only mode: `theme={{mode: 'dark'}}`
- only colors: `theme={{colors: {brand: '#2563EB'}}}`
- only classes: `theme={{classes: {primaryButton: 'bg-blue-500 p-2'}}}`

---

## API Reference

### `useTW()`

Returns:

- `tw(className: string)` -> style object
- `mode` and `toggleMode()` (when provider is mounted)
- `wppx(value)` and `hppx(value)` helpers
- `colors` from provider context

```tsx
const {tw, wppx, hppx} = useTW();

const style = tw('w-wppx(50) h-hppx(25) bg-blue-500');
const cardWidth = wppx(80);
const cardHeight = hppx(25);
```

### `styled(Component)`

Creates a component from utility classes. Interpolations are supported.

```tsx
import {View} from 'react-native';
import {styled} from 'tailwind-for-react-native';

const Avatar = styled(View)<{size: number}>`
  w-${({size}) => size}
  h-${({size}) => size}
  border-radius-9999
`;

const ProfilePicture = () => <Avatar size={48} />;
```

### `TWRNProvider`

`theme` shape:

```ts
type Theme = {
  mode?: 'light' | 'dark';
  colors?: Record<string, any>;
  styles?: Record<string, any>;
  classes?: Record<string, any>;
  wpFactorConversion?: number;
  hpFactorConversion?: number;
};
```

`TWRNProvider` is optional.
Use it when you need mode-aware colors, custom style presets, string aliases, or custom conversion factors.
Every `theme` property is optional.

Example using `mode`, `colors`, `styles`, and `classes` with both `tw(...)` and `styled(...)`:

```tsx
import {Pressable, Text, View} from 'react-native';
import {styled, TWRNProvider, useTW} from 'tailwind-for-react-native';

const Card = styled(View)`
  card
`;

const Title = styled(Text)`
  title
  color-brand
`;

const PrimaryButton = styled(Pressable)`
  primaryButton
`;

const Screen = () => {
  const {tw} = useTW();
  return (
    <Card style={tw('screen bg-surface dark:bg-black')}>
      <Title>Provider example</Title>
      <PrimaryButton style={tw('mt-8')}>
        <Text style={tw('color-white')}>Continue</Text>
      </PrimaryButton>
    </Card>
  );
};

const App = () => (
  <TWRNProvider
    theme={{
      mode: 'dark',
      colors: {
        brand: '#2563EB',
        surface: '#F5F5F5',
        light: {surface: '#FFFFFF'},
        dark: {brand: '#60A5FA', surface: '#111111'},
      },
      styles: {
        screen: {padding: 16},
        card: {borderRadius: 12},
        title: {fontSize: 16, fontWeight: '700'},
      },
      classes: {
        primaryButton: 'bg-brand p-10 border-radius-8',
      },
    }}>
    <Screen />
  </TWRNProvider>
);
```

- `mode: 'dark'` enables `dark:*` utilities (for example `dark:bg-black`).
- `colors` provides tokens like `brand` and `surface`.
- `styles` provides object presets like `screen`, `card`, and `title`.
- `classes` provides string aliases like `primaryButton`.

---

## Theming and Customization

### Colors

Use `theme.colors` for flat tokens and light/dark mode overrides:

```tsx
import {Text, View} from 'react-native';
import {styled, TWRNProvider, useTW} from 'tailwind-for-react-native';

const Title = styled(Text)`
  color-primary
`;

const Screen = () => {
  const {tw} = useTW();
  return (
    <View style={tw('bg-primary p-12')}>
      <Title>Provider color token</Title>
    </View>
  );
};

const App = () => (
  <TWRNProvider
    theme={{
      mode: 'dark',
      colors: {
        primary: '#bbbbbb',
        // Overrides for light mode
        light: {primary: '#f5f5f5'},
        // Overrides for dark mode
        dark: {primary: '#111111'},
      },
    }}>
    <Screen />
  </TWRNProvider>
);
```

You can use `primary` in both `tw('...')` and `styled(...)`.

### `theme.styles` (object presets)

Use `theme.styles` for object presets (including nested paths):

```tsx
import {Text, View} from 'react-native';
import {styled, TWRNProvider, useTW} from 'tailwind-for-react-native';

const CardTitle = styled(Text)`
  cardTitle
`;

const Screen = () => {
  const {tw} = useTW();
  return (
    <View style={tw('card buttons.primary')}>
      <CardTitle>Preset styles</CardTitle>
    </View>
  );
};

const App = () => (
  <TWRNProvider
    theme={{
      styles: {
        card: {padding: 12, borderRadius: 8},
        cardTitle: {fontSize: 16},
        buttons: {
          primary: {backgroundColor: '#3B82F6'},
        },
      },
    }}>
    <Screen />
  </TWRNProvider>
);
```

You can consume these presets from both `tw(...)` and `styled(...)`.

### `theme.classes` (string aliases)

Use `theme.classes` for reusable utility aliases and nested paths:

```tsx
import {Pressable, Text, View} from 'react-native';
import {styled, TWRNProvider, useTW} from 'tailwind-for-react-native';

const PrimaryButton = styled(Pressable)`
  primaryButton
`;

const SecondaryButton = styled(Pressable)`
  buttons.secondary
`;

const Screen = () => {
  const {tw} = useTW();
  return (
    <View style={tw('stack')}>
      <PrimaryButton>
        <Text>Primary</Text>
      </PrimaryButton>
      <SecondaryButton style={tw('mt-8')}>
        <Text>Secondary</Text>
      </SecondaryButton>
    </View>
  );
};

const App = () => (
  <TWRNProvider
    theme={{
      classes: {
        stack: 'p-12',
        primaryButton: 'bg-blue-500 p-2 border-radius-6',
        buttons: {
          secondary: 'bg-gray-200 p-2 border-radius-6',
        },
      },
    }}>
    <Screen />
  </TWRNProvider>
);
```

These aliases are available in both `tw(...)` and `styled(...)`.

Class aliases support nested references and are protected against circular loops.

---

## Utility Behavior

### Modifiers

- `dark:*` applies only in dark mode.
- `ios:*` and `android:*` apply only on the current platform.

### Precedence

- Inside a class list, later utilities win (`'mt-4 mt-8'` -> `mt-8`).

In `styled(...)`, the runtime `style` prop has final priority over generated utility styles:

```tsx
const Badge = styled(Text)`
  font-size-12
  color-white
  bg-blue-500
`;

// runtime style overrides styled utilities
<Badge style={{fontSize: 16, color: '#111111'}}>New</Badge>;
```

### Accepted value formats

Value parser supports:

- numbers (`mt-8`)
- percentages (`w-70%`)
- `auto` (`l-auto`)
- hex (`color-#fff`)
- viewport helpers (`w-wp(50)`, `h-hp(25)`)
- pixel helpers with conversion factors (`w-wppx(50)`, `h-hppx(25)`)

### Invalid classes

- Invalid utilities are ignored (fail-soft).
- In development, invalid utilities emit `console.warn`.
- In production, they are ignored silently.

### Whitespace in `styled` templates

Utilities are parsed from any whitespace (spaces, tabs, new lines).
Multi-line templates work even when classes are split only by line breaks.

---

## Responsive Guide

### Available sizing approaches

- `%` for fluid layouts (`w-70%`)
- `wp()/hp()` for direct viewport percentages in px (`w-wp(50)`, `h-hp(25)`)
- `wppx()/hppx()` for design-based scaling (`w-wppx(140)`, `h-hppx(48)`)

### Configure conversion factors

`wppx` and `hppx` use `wpFactorConversion` and `hpFactorConversion` from `TWRNProvider`.

Default values:

- `wpFactorConversion: 3.6`
- `hpFactorConversion: 8`

```tsx
<TWRNProvider
  theme={{
    wpFactorConversion: 3.6,
    hpFactorConversion: 8,
  }}>
  <App />
</TWRNProvider>
```

### Use `wppx/hppx` in utility strings

```tsx
const {tw} = useTW();
const buttonStyle = tw('w-wppx(140) h-hppx(48) px-wppx(16) border-radius-8');
```

### Use `wppx/hppx` as helpers

```tsx
const {wppx, hppx} = useTW();

const style = {
  width: wppx(140),
  height: hppx(48),
  paddingHorizontal: wppx(16),
};
```

### Practical rule of thumb

- Use `%` for fluid containers.
- Use `wp()/hp()` when you want a value tied directly to viewport percentage.
- Use `wppx()/hppx()` when your design comes from fixed specs (for example Figma values).

---

## Common Recipes

### 1) Button variants with `theme.classes`

```tsx
<TWRNProvider
  theme={{
    classes: {
      buttonBase: 'p-12 border-radius-8 items-center justify-center',
      buttonPrimary: 'buttonBase bg-blue-500',
      buttonSecondary: 'buttonBase bg-gray-200',
    },
  }}>
  {/* tw('buttonPrimary') / tw('buttonSecondary') */}
</TWRNProvider>
```

### 2) Responsive card from design specs

```tsx
const Card = styled(View)`
  w-wppx(320)
  h-hppx(180)
  p-wppx(16)
  border-radius-12
  bg-white
`;
```

### 3) Screen paddings that scale with viewport

```tsx
const {tw} = useTW();

const containerStyle = tw('px-wp(6) pt-hp(3)');
```

### 4) Custom object preset + utility alias together

```tsx
<TWRNProvider
  theme={{
    styles: {cardShadow: {shadowColor: '#000', elevation: 4}},
    classes: {panel: 'p-16 border-radius-12 bg-white'},
  }}>
  {/* tw('panel cardShadow') */}
</TWRNProvider>
```

---

# Style System

The library has **two kinds of utilities**:

1. **Computed properties** - short aliases that accept a value (e.g. `mt-8`, `w-50%`).
2. **Pre-defined properties** - boolean class-like shorthands (e.g. `items-center`, `border-dashed`).

The tables below list the utilities available in the current release.

> ℹ️  Functions **wp(…)** and **hp(…)** convert percentages of the current window width/height to pixels.
>
> ℹ️  Logical aliases keep the published short forms for inline start/end (`ms` / `me`, `ps` / `pe`), add short block start/end forms (`mbs` / `mbe`, `pbs` / `pbe`), and also support long forms like `m-inline` or `p-block-start`.

---

## Computed properties

| Class                                 | Affected style(s)                | Accepted values                   |
| ------------------------------------- | -------------------------------- | --------------------------------- |
| **m**                                 | `margin`                         | number · string · `wp()` · `hp()` |
| **mt**                                | `marginTop`                      | —                                 |
| **mr**                                | `marginRight`                    | —                                 |
| **mb**                                | `marginBottom`                   | —                                 |
| **ml**                                | `marginLeft`                     | —                                 |
| **mx**                                | `marginLeft` `marginRight`       | —                                 |
| **my**                                | `marginTop` `marginBottom`       | —                                 |
| **me**                                | `marginEnd`                      | —                                 |
| **ms**                                | `marginStart`                    | —                                 |
| **m-block**                           | `marginBlock` + `marginVertical` | —                                 |
| **mbs / m-block-start**               | `marginBlockStart` + `marginTop` | —                                 |
| **mbe / m-block-end**                 | `marginBlockEnd` + `marginBottom` | —                                |
| **m-inline**                          | `marginInline` + `marginHorizontal` | —                              |
| **m-inline-start**                    | `marginInlineStart` + `marginStart` | —                              |
| **m-inline-end**                      | `marginInlineEnd` + `marginEnd` | —                                |
| **p**                                 | `padding`                        | number · string · `wp()` · `hp()` |
| **pt**                                | `paddingTop`                     | —                                 |
| **pr**                                | `paddingRight`                   | —                                 |
| **pb**                                | `paddingBottom`                  | —                                 |
| **pl**                                | `paddingLeft`                    | —                                 |
| **px**                                | `paddingLeft` `paddingRight`     | —                                 |
| **py**                                | `paddingTop` `paddingBottom`     | —                                 |
| **pe**                                | `paddingEnd`                     | —                                 |
| **ps**                                | `paddingStart`                   | —                                 |
| **p-block**                           | `paddingBlock` + `paddingVertical` | —                               |
| **pbs / p-block-start**               | `paddingBlockStart` + `paddingTop` | —                               |
| **pbe / p-block-end**                 | `paddingBlockEnd` + `paddingBottom` | —                              |
| **p-inline**                          | `paddingInline` + `paddingHorizontal` | —                             |
| **p-inline-start**                    | `paddingInlineStart` + `paddingStart` | —                             |
| **p-inline-end**                      | `paddingInlineEnd` + `paddingEnd` | —                               |
| **h**                                 | `height`                         | number · string · `wp()` · `hp()` |
| **min-h**                             | `minHeight`                      | —                                 |
| **max-h**                             | `maxHeight`                      | —                                 |
| **w**                                 | `width`                          | —                                 |
| **min-w**                             | `minWidth`                       | —                                 |
| **max-w**                             | `maxWidth`                       | —                                 |
| **l**                                 | `left`                           | —                                 |
| **r**                                 | `right`                          | —                                 |
| **t**                                 | `top`                            | —                                 |
| **b**                                 | `bottom`                         | —                                 |
| **flex**                              | `flex`                           | number                            |
| **flex-grow**                         | `flexGrow`                       | number                            |
| **flex-shrink**                       | `flexShrink`                     | number                            |
| **z**                                 | `zIndex`                         | number                            |
| **opacity**                           | `opacity`                        | number                            |
| **aspect**                            | `aspectRatio`                    | number                            |
| **gap**                               | `gap`                            | number · string                   |
| **gap-x**                             | `columnGap`                      | number · string                   |
| **gap-y**                             | `rowGap`                         | number · string                   |
| **border-radius**                     | `borderRadius`                   | number · `wp()` · `hp()`          |
| **border-radius-tl**                  | `borderTopLeftRadius`            | —                                 |
| **border-radius-tr**                  | `borderTopRightRadius`           | —                                 |
| **border-radius-bl**                  | `borderBottomLeftRadius`         | —                                 |
| **border-radius-br**                  | `borderBottomRightRadius`        | —                                 |
| **border-radius-te**                  | `borderTopEndRadius`             | —                                 |
| **border-radius-ts**                  | `borderTopStartRadius`           | —                                 |
| **border-radius-be**                  | `borderBottomEndRadius`          | —                                 |
| **border-radius-bs**                  | `borderBottomStartRadius`        | —                                 |
| **border-radius-ee**                  | `borderEndEndRadius`             | —                                 |
| **border-radius-es**                  | `borderEndStartRadius`           | —                                 |
| **border-radius-se**                  | `borderStartEndRadius`           | —                                 |
| **border-radius-ss**                  | `borderStartStartRadius`         | —                                 |
| **border-w**                          | `borderWidth`                    | number · `wp()` · `hp()`          |
| **border-b / -t / -l / -r / -s / -e** | respective side widths           | number · `wp()` · `hp()`          |
| **color / text**                      | `color`                          | constant · hex                    |
| **bg**                                | `backgroundColor`                | constant · hex                    |
| **border**                            | `borderColor`                    | constant · hex                    |
| **border-block-color**                | `borderBlockColor` + top/bottom fallback | constant · hex            |
| **border-b-color**                    | `borderBottomColor`              | constant · hex                    |
| **border-be-color / border-block-end-color** | `borderBlockEndColor` + bottom fallback | constant · hex         |
| **border-e-color**                    | `borderEndColor`                 | constant · hex                    |
| **border-l-color**                    | `borderLeftColor`                | constant · hex                    |
| **border-r-color**                    | `borderRightColor`               | constant · hex                    |
| **border-s-color**                    | `borderStartColor`               | constant · hex                    |
| **border-t-color**                    | `borderTopColor`                 | constant · hex                    |
| **border-bs-color / border-block-start-color** | `borderBlockStartColor` + top fallback | constant · hex          |
| **font-size**                         | `fontSize`                       | number · `wp()` · `hp()`          |
| **font-weight**                       | `fontWeight`                     | number                            |
| **line-height**                       | `lineHeight`                     | number · `wp()` · `hp()`          |
| **tracking**                          | `letterSpacing`                  | number                            |
| **outline-w**                         | `outlineWidth`                   | number                            |
| **outline**                           | `outlineColor`                   | constant · hex                    |
| **outline-offset**                    | `outlineOffset`                  | number                            |
| **overlay**                           | `overlayColor`                   | constant                          |
| **shadow / elevation**                | `shadowColor` / `elevation` etc. | platform‑specific                 |
| **text-shadow**                       | `textShadowColor`                | constant · hex                    |
| **text-shadow-radius**                | `textShadowRadius`               | number                            |
| **decoration**                        | `textDecorationColor`            | constant · hex                    |
| **tint**                              | `tintColor`                      | constant · hex                    |
| **start**                             | `start`                          | number · string · `wp()` · `hp()` |
| **end**                               | `end`                            | number · string · `wp()` · `hp()` |
| **basis**                             | `flexBasis`                      | number · string                   |
| **font**                              | `fontFamily`                     | constant                          |

---

## Pre‑defined properties

The following tables show every boolean utility now bundled with the library.

### Layout

#### Display

| Class      | Style             |
| ---------- | ----------------- |
| **d-flex** | `display: 'flex'` |
| **d-none** | `display: 'none'` |

#### Position

| Class        | Style                  |
| ------------ | ---------------------- |
| **relative** | `position: 'relative'` |
| **absolute** | `position: 'absolute'` |

#### Box sizing

| Class           | Style                      |
| --------------- | -------------------------- |
| **box-border**  | `boxSizing: 'border-box'`  |
| **box-content** | `boxSizing: 'content-box'` |

#### Overflow

| Class                | Style                 |
| -------------------- | --------------------- |
| **overflow-visible** | `overflow: 'visible'` |
| **overflow-hidden**  | `overflow: 'hidden'`  |
| **overflow-scroll**  | `overflow: 'scroll'`  |

#### Direction & writing

| Class            | Style                      |
| ---------------- | -------------------------- |
| **dir-inherit**  | `direction: 'inherit'`     |
| **dir-ltr**      | `direction: 'ltr'`         |
| **dir-rtl**      | `direction: 'rtl'`         |
| **writing-auto** | `writingDirection: 'auto'` |
| **writing-ltr**  | `writingDirection: 'ltr'`  |
| **writing-rtl**  | `writingDirection: 'rtl'`  |

#### Cursor & pointer events

| Class                       | Style                       |
| --------------------------- | --------------------------- |
| **cursor-auto**             | `cursor: 'auto'`            |
| **cursor-pointer**          | `cursor: 'pointer'`         |
| **pointer-events-none**     | `pointerEvents: 'none'`     |
| **pointer-events-auto**     | `pointerEvents: 'auto'`     |
| **pointer-events-box-none** | `pointerEvents: 'box-none'` |
| **pointer-events-box-only** | `pointerEvents: 'box-only'` |

#### Backface visibility

| Class                | Style                           |
| -------------------- | ------------------------------- |
| **backface-hidden**  | `backfaceVisibility: 'hidden'`  |
| **backface-visible** | `backfaceVisibility: 'visible'` |

---

### Flexbox helpers

#### Flex direction

| Class                | Style                             |
| -------------------- | --------------------------------- |
| **flex-col**         | `flexDirection: 'column'`         |
| **flex-row**         | `flexDirection: 'row'`            |
| **flex-col-reverse** | `flexDirection: 'column-reverse'` |
| **flex-row-reverse** | `flexDirection: 'row-reverse'`    |

#### Flex wrap

| Class                 | Style                      |
| --------------------- | -------------------------- |
| **flex-wrap**         | `flexWrap: 'wrap'`         |
| **flex-nowrap**       | `flexWrap: 'nowrap'`       |
| **flex-wrap-reverse** | `flexWrap: 'wrap-reverse'` |

#### Align content

| Class               | Style                           |
| ------------------- | ------------------------------- |
| **content-start**   | `alignContent: 'flex-start'`    |
| **content-end**     | `alignContent: 'flex-end'`      |
| **content-center**  | `alignContent: 'center'`        |
| **content-between** | `alignContent: 'space-between'` |
| **content-around**  | `alignContent: 'space-around'`  |
| **content-evenly**  | `alignContent: 'space-evenly'`  |
| **content-stretch** | `alignContent: 'stretch'`       |

#### Align items

| Class              | Style                      |
| ------------------ | -------------------------- |
| **items-start**    | `alignItems: 'flex-start'` |
| **items-end**      | `alignItems: 'flex-end'`   |
| **items-center**   | `alignItems: 'center'`     |
| **items-baseline** | `alignItems: 'baseline'`   |
| **items-stretch**  | `alignItems: 'stretch'`    |

#### Align self

| Class             | Style                     |
| ----------------- | ------------------------- |
| **self-start**    | `alignSelf: 'flex-start'` |
| **self-end**      | `alignSelf: 'flex-end'`   |
| **self-center**   | `alignSelf: 'center'`     |
| **self-baseline** | `alignSelf: 'baseline'`   |
| **self-stretch**  | `alignSelf: 'stretch'`    |
| **self-auto**     | `alignSelf: 'auto'`       |

#### Justify content

| Class               | Style                             |
| ------------------- | --------------------------------- |
| **justify-start**   | `justifyContent: 'flex-start'`    |
| **justify-end**     | `justifyContent: 'flex-end'`      |
| **justify-center**  | `justifyContent: 'center'`        |
| **justify-between** | `justifyContent: 'space-between'` |
| **justify-around**  | `justifyContent: 'space-around'`  |
| **justify-evenly**  | `justifyContent: 'space-evenly'`  |

---

### Borders & Outline

#### Border style

| Class             | Style                   |
| ----------------- | ----------------------- |
| **border-solid**  | `borderStyle: 'solid'`  |
| **border-dotted** | `borderStyle: 'dotted'` |
| **border-dashed** | `borderStyle: 'dashed'` |

#### Border curve *(Android 14 + iOS 17)*

| Class                       | Style                       |
| --------------------------- | --------------------------- |
| **border-curve-circular**   | `borderCurve: 'circular'`   |
| **border-curve-continuous** | `borderCurve: 'continuous'` |

#### Outline style *(Web / Windows only)*

| Class              | Style                    |
| ------------------ | ------------------------ |
| **outline-solid**  | `outlineStyle: 'solid'`  |
| **outline-dotted** | `outlineStyle: 'dotted'` |
| **outline-dashed** | `outlineStyle: 'dashed'` |

---

### Typography

#### Font weight

| Class           | Style |
| --------------- | ----- |
| font-thin       | `100` |
| font-extralight | `200` |
| font-light      | `300` |
| font-normal     | `400` |
| font-medium     | `500` |
| font-semibold   | `600` |
| font-bold       | `700` |
| font-extrabold  | `800` |
| font-black      | `900` |

#### Font style

| Class                 | Style                 |
| --------------------- | --------------------- |
| **font-style-normal** | `fontStyle: 'normal'` |
| **font-style-italic** | `fontStyle: 'italic'` |

#### Font variant

| Class                 | Style                   |
| --------------------- | ----------------------- |
| **small-caps**        | `['small-caps']`        |
| **oldstyle-nums**     | `['oldstyle-nums']`     |
| **lining-nums**       | `['lining-nums']`       |
| **tabular-nums**      | `['tabular-nums']`      |
| **proportional-nums** | `['proportional-nums']` |

#### Include font padding *(Android)*

| Class                 | Style                       |
| --------------------- | --------------------------- |
| **font-padding**      | `includeFontPadding: true`  |
| **font-padding-none** | `includeFontPadding: false` |

#### Text align

| Class            | Style     |
| ---------------- | --------- |
| **text-auto**    | `auto`    |
| **text-left**    | `left`    |
| **text-center**  | `center`  |
| **text-right**   | `right`   |
| **text-justify** | `justify` |

#### Text align vertical *(Android only)*

| Class                    | Style    |
| ------------------------ | -------- |
| **text-vertical-auto**   | `auto`   |
| **text-vertical-top**    | `top`    |
| **text-vertical-center** | `center` |
| **text-vertical-bottom** | `bottom` |

#### Text decoration line

| Class                      | Style                    |
| -------------------------- | ------------------------ |
| **underline**              | `underline`              |
| **line-through**           | `line-through`           |
| **underline-line-through** | `underline line-through` |
| **no-underline**           | `none`                   |

#### Text decoration style

| Class                 | Style    |
| --------------------- | -------- |
| **decoration-solid**  | `solid`  |
| **decoration-double** | `double` |
| **decoration-dotted** | `dotted` |
| **decoration-dashed** | `dashed` |

#### Text transform

| Class           | Style        |
| --------------- | ------------ |
| **uppercase**   | `uppercase`  |
| **lowercase**   | `lowercase`  |
| **capitalize**  | `capitalize` |
| **normal-case** | `none`       |

#### Vertical align *(Web)*

| Class               | Style    |
| ------------------- | -------- |
| **vertical-auto**   | `auto`   |
| **vertical-top**    | `top`    |
| **vertical-middle** | `middle` |
| **vertical-bottom** | `bottom` |
| **vertical-baseline** | `baseline` |

#### User select *(Web)*

| Class              | Style     |
| ------------------ | --------- |
| **select-auto**    | `auto`    |
| **select-text**    | `text`    |
| **select-none**    | `none`    |
| **select-contain** | `contain` |
| **select-all**     | `all`     |

---

### Images & media

#### Resize mode

> ℹ️  Utility names are currently `risize-*` (spelled as implemented) for backward compatibility.

| Class              | Style     |
| ------------------ | --------- |
| **risize-cover**   | `cover`   |
| **risize-contain** | `contain` |
| **risize-stretch** | `stretch` |
| **risize-repeat**  | `repeat`  |
| **risize-center**  | `center`  |

#### Object fit *(Web / iOS 17)*

| Class                 | Style        |
| --------------------- | ------------ |
| **object-cover**      | `cover`      |
| **object-contain**    | `contain`    |
| **object-fill**       | `fill`       |
| **object-scale-down** | `scale-down` |

---

### Constants

#### Colors

Default color tokens in this library:

| Family | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| red | `#FEF2F2` | `#FFE2E2` | `#FFC9C9` | `#FFA2A2` | `#FF6467` | `#FB2C36` | `#E7000B` | `#C10007` | `#9F0712` | `#82181A` | `#460809` |
| orange | `#FFF7ED` | `#FFEDD4` | `#FFD6A7` | `#FFB86A` | `#FF8904` | `#FF6900` | `#F54900` | `#CA3500` | `#9F2D00` | `#7E2A0C` | `#441306` |
| amber | `#FFFBEB` | `#FEF3C6` | `#FEE685` | `#FFD230` | `#FFB900` | `#FE9A00` | `#E17100` | `#BB4D00` | `#973C00` | `#7B3306` | `#461901` |
| yellow | `#FEFCE8` | `#FEF9C2` | `#FFF085` | `#FFDF20` | `#FDC700` | `#F0B100` | `#D08700` | `#A65F00` | `#894B00` | `#733E0A` | `#432004` |
| lime | `#F7FEE7` | `#ECFCCA` | `#D8F999` | `#BBF451` | `#9AE600` | `#7CCF00` | `#5EA500` | `#497D00` | `#3C6300` | `#35530E` | `#192E03` |
| green | `#F0FDF4` | `#DCFCE7` | `#B9F8CF` | `#7BF1A8` | `#05DF72` | `#00C950` | `#00A63E` | `#008236` | `#016630` | `#0D542B` | `#032E15` |
| emerald | `#ECFDF5` | `#D0FAE5` | `#A4F4CF` | `#5EE9B5` | `#00D492` | `#00BC7D` | `#009966` | `#007A55` | `#006045` | `#004F3B` | `#002C22` |
| teal | `#F0FDFA` | `#CBFBF1` | `#96F7E4` | `#46ECD5` | `#00D5BE` | `#00BBA7` | `#009689` | `#00786F` | `#005F5A` | `#0B4F4A` | `#022F2E` |
| cyan | `#ECFEFF` | `#CEFAFE` | `#A2F4FD` | `#53EAFD` | `#00D3F2` | `#00B8DB` | `#0092B8` | `#007595` | `#005F78` | `#104E64` | `#053345` |
| sky | `#F0F9FF` | `#DFF2FE` | `#B8E6FE` | `#74D4FF` | `#00BCFF` | `#00A6F4` | `#0084D1` | `#0069A8` | `#00598A` | `#024A70` | `#052F4A` |
| blue | `#EFF6FF` | `#DBEAFE` | `#BEDBFF` | `#8EC5FF` | `#51A2FF` | `#2B7FFF` | `#155DFC` | `#1447E6` | `#193CB8` | `#1C398E` | `#162456` |
| indigo | `#EEF2FF` | `#E0E7FF` | `#C6D2FF` | `#A3B3FF` | `#7C86FF` | `#615FFF` | `#4F39F6` | `#432DD7` | `#372AAC` | `#312C85` | `#1E1A4D` |
| violet | `#F5F3FF` | `#EDE9FE` | `#DDD6FF` | `#C4B4FF` | `#A684FF` | `#8E51FF` | `#7F22FE` | `#7008E7` | `#5D0EC0` | `#4D179A` | `#2F0D68` |
| purple | `#FAF5FF` | `#F3E8FF` | `#E9D4FF` | `#DAB2FF` | `#C27AFF` | `#AD46FF` | `#9810FA` | `#8200DB` | `#6E11B0` | `#59168B` | `#3C0366` |
| fuchsia | `#FDF4FF` | `#FAE8FF` | `#F6CFFF` | `#F4A8FF` | `#ED6AFF` | `#E12AFB` | `#C800DE` | `#A800B7` | `#8A0194` | `#721378` | `#4B004F` |
| pink | `#FDF2F8` | `#FCE7F3` | `#FCCEE8` | `#FDA5D5` | `#FB64B6` | `#F6339A` | `#E60076` | `#C6005C` | `#A3004C` | `#861043` | `#510424` |
| rose | `#FFF1F2` | `#FFE4E6` | `#FFCCD3` | `#FFA1AD` | `#FF637E` | `#FF2056` | `#EC003F` | `#C70036` | `#A50036` | `#8B0836` | `#4D0218` |
| slate | `#F8FAFC` | `#F1F5F9` | `#E2E8F0` | `#CAD5E2` | `#90A1B9` | `#62748E` | `#45556C` | `#314158` | `#1D293D` | `#0F172B` | `#020618` |
| gray | `#F9FAFB` | `#F3F4F6` | `#E5E7EB` | `#D1D5DC` | `#99A1AF` | `#6A7282` | `#4A5565` | `#364153` | `#1E2939` | `#101828` | `#030712` |
| zinc | `#FAFAFA` | `#F4F4F5` | `#E4E4E7` | `#D4D4D8` | `#9F9FA9` | `#71717B` | `#52525C` | `#3F3F46` | `#27272A` | `#18181B` | `#09090B` |
| neutral | `#FAFAFA` | `#F5F5F5` | `#E5E5E5` | `#D4D4D4` | `#A1A1A1` | `#737373` | `#525252` | `#404040` | `#262626` | `#171717` | `#0A0A0A` |
| stone | `#FAFAF9` | `#F5F5F4` | `#E7E5E4` | `#D6D3D1` | `#A6A09B` | `#79716B` | `#57534D` | `#44403B` | `#292524` | `#1C1917` | `#0C0A09` |
| taupe | `#FBFAF9` | `#F3F1F1` | `#E8E4E3` | `#D8D2D0` | `#ABA09C` | `#7C6D67` | `#5B4F4B` | `#473C39` | `#2B2422` | `#1D1816` | `#0C0A09` |
| mauve | `#FAFAFA` | `#F3F1F3` | `#E7E4E7` | `#D7D0D7` | `#A89EA9` | `#79697B` | `#594C5B` | `#463947` | `#2A212C` | `#1D161E` | `#0C090C` |
| mist | `#F9FBFB` | `#F1F3F3` | `#E3E7E8` | `#D0D6D8` | `#9CA8AB` | `#67787C` | `#4B585B` | `#394447` | `#22292B` | `#161B1D` | `#090B0C` |
| olive | `#FBFBF9` | `#F4F4F0` | `#E8E8E3` | `#D8D8D0` | `#ABAB9C` | `#7C7C67` | `#5B5B4B` | `#474739` | `#2B2B22` | `#1D1D16` | `#0C0C09` |

Named color values like `white` and `black` also work as direct color strings.
