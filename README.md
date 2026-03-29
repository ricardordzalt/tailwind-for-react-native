# tailwind-for-react-native

## Get started

### Installation

Install this library with **npm**:

```bash
npm i tailwind-for-react-native
```

or with **yarn**:

```bash
yarn add tailwind-for-react-native
```

---

### Example

The following snippet shows the default template rewritten with **tailwind‑for‑react‑native**.

```tsx
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {styled, TWRNProvider, useTW} from 'tailwind-for-react-native';

const CustomSafeAreaView = styled(SafeAreaView)`
  bg-lighter
  dark:bg-darker
`;

const CustomScrollView = styled(ScrollView)`
  bg-lighter
  dark:bg-darker
`;

const ContentContainer = styled(View)`
  bg-white
  dark:bg-black
`;

const BoldText = styled(Text)`
  font-bold
`;

const SectionContainer = styled(View)`
  mt-32
  px-24
`;

const SectionTitle = styled(Text)`
  font-size-24
  font-semibold
  color-black
  dark:color-white
`;

const SectionText = styled(Text)`
  mt-8
  font-size-18
  font-normal
  color-dark
  dark:color-light
`;

type SectionProps = PropsWithChildren<{ title: string }>;

function Section({children, title}: SectionProps) {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionText>{children}</SectionText>
    </SectionContainer>
  );
}

function YourApp() {
  const isDarkMode = useColorScheme() === 'dark';
  const {tw} = useTW();
  const statusBarBackgroundColor = tw('bg-lighter dark:bg-darker');
  return (
    <CustomSafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarBackgroundColor.backgroundColor}
      />
      <CustomScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <ContentContainer>
          <Section title="Step One">
            Edit <BoldText>App.tsx</BoldText> to change this screen and then
            come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </ContentContainer>
      </CustomScrollView>
    </CustomSafeAreaView>
  );
}

const App = () => {
  const mode = useColorScheme();
  return (
    <TWRNProvider theme={{mode, colors: Colors}}>
      <YourApp />
    </TWRNProvider>
  );
};

export default App;
```

---

## API Reference

### `styled()` – create styled components

```ts
import { Pressable, Text } from 'react-native';
import { styled } from 'tailwind-for-react-native';

const Button = styled(Pressable)`
  border-radius-8
  p-6
  h-50
  w-70%
  justify-center
  items-center
`;

const ButtonText = styled(Text)`
  font-size-16
  color-#fff
`;
```

### `useTW()` – utility hook

```ts
import { useTW } from 'tailwind-for-react-native';

const { tw } = useTW();
const style = tw('bg-blue-500 font-bold');
```

### `TWRNProvider` – theme and mode

`theme.colors` supports both flat colors and mode overrides in the same object.

- Flat colors: regular color tokens (for any mode).
- Mode overrides: if `colors.light` / `colors.dark` are **objects**, they are used as mode-specific overrides.
- If `colors.light` / `colors.dark` are strings (or non-objects), they are treated as normal flat color keys.
- `theme.styles` accepts style objects (`{primaryButton: {padding: 8}}`).
- `theme.classes` accepts utility aliases as strings (`{primaryButton: 'bg-blue-500 p-2'}`), including nested paths like `buttons.primary`.

```tsx
// Flat colors only
<TWRNProvider
  theme={{
    mode: 'light',
    colors: {
      primary: '#bbbbbb',
      light: '#ededed',
      dark: '#121212',
    },
  }}>
  <App />
</TWRNProvider>

// Flat colors + mode overrides
<TWRNProvider
  theme={{
    mode: 'dark',
    colors: {
      primary: '#bbbbbb',
      light: {primary: '#f5f5f5'},
      dark: {primary: '#111111'},
    },
  }}>
  <App />
</TWRNProvider>

// Reusable class aliases
<TWRNProvider
  theme={{
    classes: {
      primaryButton: 'bg-blue-500 p-2',
      buttons: {
        secondary: 'bg-gray-200 p-2',
      },
    },
    styles: {
      buttonLabel: {fontWeight: '700'},
    },
  }}>
  <App />
</TWRNProvider>
```

### Style precedence in `styled(...)`

When using `styled(Component)`, styles passed via the `style` prop always have final priority:

- Object style: `{...twStyles, ...propStyle}`
- Array style: `[twStyles, ...propStyleArray]`

This allows local JSX overrides without changing the base styled component.

### Invalid utilities

- Invalid classes are ignored (fail-soft).
- In development (`NODE_ENV !== 'production'`), invalid classes emit `console.warn`.
- In production, invalid classes are ignored silently.

---

# Style System

The library exposes **two kinds of utilities**:

1. **Computed properties** – short aliases that accept a value (e.g. `mt-8`, `w-50%`).
2. **Pre‑defined properties** – boolean class‑like shorthands (e.g. `items-center`, `border-dashed`).

Below you will find an exhaustive reference for the current release.

> ℹ️  Functions **wp(…)** and **hp(…)** convert percentages of the current window width/height to pixels.
>
> ℹ️  Logical aliases keep the published short forms for inline start/end (`ms` / `me`, `ps` / `pe`), add Tailwind-style block start/end shorthands (`mbs` / `mbe`, `pbs` / `pbe`), and also support long forms like `m-inline` or `p-block-start`. For compatibility, the newly added logical aliases emit both the React Native logical prop and the closest legacy equivalent.

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

| Code      | Value |
| ----------- | ----------- |
| blue-50      | '#EFF6FF'       |
| blue-100      | '#DBEAFE'       |
| blue-200      | '#BFDBFE'       |
| blue-300      | '#93C5FD'       |
| blue-400      | '#60A5FA'       |
| blue-500      | '#3B82F6'       |
| blue-600      | '#2563EB'       |
| blue-700      | '#1D4ED8'       |
| blue-800      | '#1E40AF'       |
| blue-900      | '#1E3A8A'       |
| yellow-50      | '#FFFBEB'       |
| yellow-100      | '#FEF3C7'       |
| yellow-200      | '#FDE68A'       |
| yellow-300      | '#FCD34D'       |
| yellow-400      | '#FBBF24'       |
| yellow-500      | '#F59E0B'       |
| yellow-600      | '#D97706'       |
| yellow-700      | '#B45309'       |
| yellow-800      | '#92400E'       |
| yellow-900      | '#78350F'       |
| red-50      | '#FEF2F2'       |
| red-100      | '#FEE2E2'       |
| red-200      | '#FECACA'       |
| red-300      | '#FCA5A5'       |
| red-400      | '#F87171'       |
| red-500      | '#EF4444'       |
| red-600      | '#DC2626'       |
| red-700      | '#B91C1C'       |
| red-800      | '#991B1B'       |
| red-900      | '#7F1D1D'       |
| purple-50      | '#F5F3FF'       |
| purple-100      | '#EDE9FE'       |
| purple-200      | '#DDD6FE'       |
| purple-300      | '#C4B5FD'       |
| purple-400      | '#A78BFA'       |
| purple-500      | '#8B5CF6'       |
| purple-600      | '#7C3AED'       |
| purple-700      | '#6D28D9'       |
| purple-800      | '#5B21B6'       |
| purple-900      | '#4C1D95'       |
| pink-50      | '#FDF2F8'       |
| pink-100      | '#FCE7F3'       |
| pink-200      | '#FBCFE8'       |
| pink-300      | '#F9A8D4'       |
| pink-400      | '#F472B6'       |
| pink-500      | '#EC4899'       |
| pink-600      | '#DB2777'       |
| pink-700      | '#BE185D'       |
| pink-800      | '#9D174D'       |
| pink-900      | '#831843'       |
| indigo-50      | '#EEF2FF'       |
| indigo-100      | '#E0E7FF'       |
| indigo-200      | '#C7D2FE'       |
| indigo-300      | '#A5B4FC'       |
| indigo-400      | '#818CF8'       |
| indigo-500      | '#6366F1'       |
| indigo-600      | '#4F46E5'       |
| indigo-700      | '#4338CA'       |
| indigo-800      | '#3730A3'       |
| indigo-900      | '#312E81'       |
| green-50      | '#ECFDF5'       |
| green-100      | '#D1FAE5'       |
| green-200      | '#A7F3D0'       |
| green-300      | '#6EE7B7'       |
| green-400      | '#34D399'       |
| green-500      | '#10B981'       |
| green-600      | '#059669'       |
| green-700      | '#047857'       |
| green-800      | '#065F46'       |
| green-900      | '#064E3B'       |
| gray-50      | '#F9FAFB'       |
| gray-100      | '#F3F4F6'       |
| gray-200      | '#E5E7EB'       |
| gray-300      | '#D1D5DB'       |
| gray-400      | '#9CA3AF'       |
| gray-500      | '#6B7280'       |
| gray-600      | '#4B5563'       |
| gray-700      | '#374151'       |
| gray-800      | '#1F2937'       |
| gray-900      | '#111827'       |
