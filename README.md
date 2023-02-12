# Get started

### Installation

Install this library with npm:

    npm i tailwind-for-react-native

or with yarn:

    yarn add tailwind-for-react-native

### Example
React Native v0.71 default [template](https://github.com/facebook/react-native/blob/0.71-stable/template/App.tsx) wrote with tailwind-for-react-native below.
<details>
  <summary>See example</summary>
  <br>

  ```javascript
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
  import {styled, TWRNProvider, useTW} from '../src';

  type SectionProps = PropsWithChildren<{
    title: string;
  }>;

  //  {
  //    marginTop: 32,
  //    paddingLeft: 24,
  //    paddingRigh: 24,
  //  }
  const SectionContainer = styled(View)`
    mt-32
    px-24
  `;

  //  {
  //    fontSize: 24,
  //    fontWeight: 600,
  //    color: '#000',
  //    Next style applies only on dark mode
  //    color: '#fff',
  //  }
  const SectionTitle = styled(Text)`
    font-size-24
    font-weight-600
    color-black
    dark:color-white
  `;

  //  {
  //    marginTop: 8,
  //    fontSize: 18,
  //    fontWeight: 400,
  //    color: '#000',
  //    Next style applies only on dark mode
  //    color: '#DAE1E7', <-- Comes from provider's theme, also it comes from Colors object import
  //  }
  const SectionDescription = styled(Text)`
    mt-8
    font-size-18
    font-weight-400
    color-black
    dark:color-light
  `;

  //  {
  //    fontWeight: 700,
  //  }
  const HighlightText = styled(Text)`
    font-weight-700
  `;

  function Section({children, title}: SectionProps): JSX.Element {
    return (
      <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{children}</SectionDescription>
      </SectionContainer>
    );
  }

  function YourApp(): JSX.Element {
    const {tw, mode} = useTW();
    //  {
    //    color: '#fff',
    //    Next style applies only on dark mode
    //    color: '##444', <-- Comes from provider's theme, also it comes from Colors object import
    //  }
    const backgroundStyle = tw('bg-white dark:bg-dark');
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={mode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          {/*
            {
              color: '#fff',
              Next style applies only on dark mode
              color: '##000', <-- Comes from provider's theme, also it comes from Colors object import
            }
          */}
          <View style={tw('bg-white dark:bg-black')}>
            <Section title="Step One">
              Edit <HighlightText>App.tsx</HighlightText> to change this screen
              and then come back to see your edits.
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
          </View>
        </ScrollView>
      </SafeAreaView>
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
</details>



### Styled function

#### Create new componentes with styled function

The styled function allows us to create components from another component using tagged template literals. We use styled and pass it as a parameter a component that accepts a styles object in the style property.

```js

import { Pressable, Text } from 'react-native';
import { styled } from 'tailwind-for-react-native';

const Button = styled(Pressable)`
  rounded-8
  padding-6
  height-50
  width-70%
  justify-center
  items-center
`;

const ButtonText = styled(Text)`
  font-size-16
  color-#fff
`;

const MyComponent = () => {
  return (
    <Button>
      <ButtonText>
        Press me
      </ButtonText>
    </Button>
  );
};

```

#### Pass props

You can pass props to the components created by the styled function, and access them in the interpolation. The following example receives a color for the background color of the button.


```js
import { Pressable, Text } from "react-native";
import { styled } from "tailwind-for-react-native";

// This component uses color prop to set backgroundColor style
// and uses #fff as default value
const Button = styled(Pressable)`
  bg-${({ color }) => color ?? "#fff"}
`;

const App = () => {
  return (
    <>
      {/* This button is red */}
      <Button color="#f00">
        <Text>Press me</Text>
      </Button>
      {/* This button is blue */}
      <Button color="#00f">
        <Text>Press me</Text>
      </Button>
    </>
  );
};

export default App;
```


### Hook useTW

#### The tw function
```js
  tw: (string) => styles
```

In addition to the styled function, the tw function allows us to create a style from a string of text with the styles we want to apply.
#### Modo oscuro
```js
  mode: 'light' | 'dark' - default 'light'
```

We can use mode to know if our current state is dark or light.

#### Colores
```js
  colors: Object
```
The colors object allows us to access the colors available for use in our styles.

### TWRNProvider

We can extend the functionality of the library by passing values to the TWRNProvider.

#### mode

We can control the current mode state of the provider, either 'light' or 'dark'.

#### colors

Pass a colors object to the provider to be able to access them through styles that accept a color, such as backgroundColor(bg) or color(color).

#### styles

Sometimes we need to add more styles than the library has by default. To do this, we can pass a new styles object to the provider and use it within our functions.

#### Responsive design

A way to create interfaces that adapt to the dimensions of the screens of different devices is to use percentages. When we create styles, we can pass values to some properties with the functions within styles hp(number) and wp(number), which will return as a value, the percentage of the height or width of the screen, respectively.

```js
import { Button }  from 'react-native';
import { styled }  from 'tailwind-for-react-native';

const SmallButton = styled(Button)`
  w-wp(50)
  h-hp(10)
`;
```

The code above creates a new component from a React Native button and adds the styles width with 50% of the device screen width, and height with 10% of the device screen height. You can use hp and wp in any style that accepts numeric values.

### Modo oscuro

It is possible to condition styles to be applied only in dark mode, if we want to control the dark mode state it is possible to use TWRNProvider and pass the value of mode to the theme property. We can even combine it with the useColorScheme hook, which provides and subscribes to updates of color schemes from the Appearance module and updates our styles when a change made by the user in the device mode is detected.


```js
import { useColorScheme } from 'react-native';
import { TWRNProvider } from 'tailwind-for-react-native';

const App = () => {
  const mode = useColorScheme();
  return (
    <TWRNProvider theme={{mode}}>
      <YourApp />
    </TWRNProvider>
  );
};
```

In your application

```js
const Container = styled(View)`
  bg-white
  dark:bg-black
`;
```

The "bg-white" style, which returns a "backgroundColor: 'white'" value, will always be applied, however, it can be overridden by the second style: "dark:bg-black", when the mode configured in the TWRNProvider state is "dark".

### Plataforma (iOS, Android)

We can condition styles to a specific platform (Android or iOS) by prefixing the style name with "android" or "ios" respectively, for the styles we want to condition.

```js
const Container = styled(View)`
  android:bg-#a4c639
  ios:bg-#5856d6
`;
```

"The backgroundColor with the value #a4c639 will only be applied on devices with Android operating system, and the backgroundColor #5856d6 will only be applied on iOS devices."

### Available Computed Properties

Available computed properties needs a dash following by the desired value

NOTE: wp(number) and hp(number) will calculate the window's width and height.
Example: If your device width is 390px, wp(50) will return 195. Also hp(number) its based on device height.

#### Margin

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| m      | margin       | number, string, wp(number), hp(number)       |
| mt      | marginTop       | number, string, wp(number), hp(number)       |
| mr      | marginRight       | number, string, wp(number), hp(number)       |
| mb      | marginBottom       | number, string, wp(number), hp(number)       |
| ml      | marginLeft       | number, string, wp(number), hp(number)       |
| mx      | marginLeft, marginRight       | number, string, wp(number), hp(number)       |
| my      | marginTop, marginBottom       | number, string, wp(number), hp(number)       |

#### Padding

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| p      | padding       | number, string, wp(number), hp(number)       |
| pt      | paddingTop       | number, string, wp(number), hp(number)       |
| pr      | paddingRight       | number, string, wp(number), hp(number)       |
| pb      | paddingBottom       | number, string, wp(number), hp(number)       |
| pl      | paddingLeft       | number, string, wp(number), hp(number)       |
| px      | paddingLeft, paddingRight       | number, string, wp(number), hp(number)       |
| py      | paddingTop, paddingBottom       | number, string, wp(number), hp(number)       |

#### Height

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| h      | height       | number, string, wp(number), hp(number)       |

#### Min Height

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| min-h      | minHeight       | number, string, wp(number), hp(number)       |

#### Max Height

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| max-h      | maxHeight       | number, string, wp(number), hp(number)       |

#### Width

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| w      | width       | number, string, wp(number), hp(number)       |

#### Min Width

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| min-w      | minWidth       | number, string, wp(number), hp(number)       |

#### Max Width

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| max-w      | maxWidth       | number, string, wp(number), hp(number)       |

#### Left

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| l      | left       | number, string, wp(number), hp(number)       |

#### Right

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| r      | right       | number, string, wp(number), hp(number)       |

#### Top

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| t      | top       | number, string, wp(number), hp(number)       |

#### Bottom

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| b      | bottom       | number, string, wp(number), hp(number)       |

#### Border Radius

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| rounded      | borderRadius       | number, wp(number), hp(number)       |
| rounded-tl      | borderTopLeftRadius       | number, wp(number), hp(number)       |
| rounded-tr      | borderTopRightRadius       | number, wp(number), hp(number)       |
| rounded-br      | borderBottomRightRadius       | number, wp(number), hp(number)       |
| rounded-bl      | borderBottomLeftRadius       | number, wp(number), hp(number)       |

#### Border Width

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| border-b      | borderBottomWidth       | number, wp(number), hp(number)       |
| border-e      | borderEndWidth       | number, wp(number), hp(number)       |
| border-l      | borderLeftWidth       | number, wp(number), hp(number)       |
| border-r      | borderRightWidth       | number, wp(number), hp(number)       |
| border-s      | borderStartWidth       | number, wp(number), hp(number)       |
| border-t      | borderTopWidth       | number, wp(number), hp(number)       |
| border-w      | borderWidth       | number, wp(number), hp(number)       |

#### Background Color

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| bg      | backgroundColor       | Color (See Constants Section), Hexadecimal color        |

#### Color

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| color (text also might work)      | color       | Color (See Constants Section), Hexadecimal color        |

#### Font Size

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| font-size      | fontSize       | number, wp(number), hp(number)       |
#### Font Weight

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| font-weight      | fontWeight       | number       |

#### Flex

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| flex      | flex       | number       |

#### Flex Shrink

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| flex-shrink      | flexShrink       | number       |

#### Flex Grow

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| flex-grow      | flexGrow       | number       |

#### Aspect Ratio

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| aspect      | aspectRatio       | number       |

#### Z Index

| Class      | Affected Properties | Accepted Values |
| ----------- | ----------- | ----------- |
| z      | zIndex       | number       |



### Available predefined properties

### Direction

#### Direction

| Class      | Properties |
| ----------- | ----------- |
| dir-inherit   | direction: 'inherit'        |
| dir-ltr   | direction: 'ltr'        |
| dir-rtl   | direction: 'rtl'        |

### Display

#### Display

| Class      | Properties |
| ----------- | ----------- |
| d-flex   | display: 'flex'        |
| d-none   | display: 'none'        |

#### Flex

##### Align Content

| Class      | Properties |
| ----------- | ----------- |
| content-start      | alignContent: 'flex-start'       |
| content-end   | alignContent: 'flex-end'        |
| content-stretch   | alignContent: 'stretch'        |
| content-center   | alignContent: 'center'        |
| content-between   | alignContent: 'space-between'        |
| content-around   | alignContent: 'space-around'        |

##### Align Items

| Class      | Properties |
| ----------- | ----------- |
| items-start      | alignItems: 'flex-start'       |
| items-end   | alignItems: 'flex-end'        |
| items-center   | alignItems: 'center'        |
| items-baseline   | alignItems: 'baseline'        |
| items-stretch   | alignItems: 'stretch'        |

##### Align Self

| Class      | Properties |
| ----------- | ----------- |
| self-start      | alignSelf: 'flex-start'       |
| self-end   | alignSelf: 'flex-end'        |
| self-center   | alignSelf: 'center'        |
| self-baseline   | alignSelf: 'baseline'        |
| self-stretch   | alignSelf: 'stretch'        |

##### Flex Direction

| Class      | Properties |
| ----------- | ----------- |
| flex-col      | flexDirection: 'column'       |
| flex-row   | flexDirection: 'row'        |
| flex-col-reverse   | flexDirection: 'column-reverse'        |
| flex-row-reverse   | flexDirection: 'row-reverse'        |

##### Flex Wrap

| Class      | Properties |
| ----------- | ----------- |
| flex-wrap      | flexWrap: 'wrap'       |
| flex-nowrap   | flexWrap: 'nowrap'        |
| flex-wrap-reverse   | flexWrap: 'wrap-reverse'        |

##### Justify Content

| Class      | Properties |
| ----------- | ----------- |
| justify-start      | justifyContent: 'flex-start'       |
| justify-end      | justifyContent: 'flex-end'       |
| justify-center      | justifyContent: 'center'       |
| justify-between      | justifyContent: 'space-between'       |
| justify-around      | justifyContent: 'space-around'       |
| justify-evenly      | justifyContent: 'space-evenly'       |

### Font

#### Font Weight

| Class      | Properties |
| ----------- | ----------- |
| font-thin      | fontWeight: '100'       |
| font-extralight      | fontWeight: '200'       |
| font-light      | fontWeight: '300'       |
| font-normal      | fontWeight: '400'       |
| font-medium      | fontWeight: '500'       |
| font-semibold      | fontWeight: '600'       |
| font-bold      | fontWeight: '700'       |
| font-extrabold      | fontWeight: '800'       |
| font-black      | fontWeight: '900'       |

### Position

#### Position

| Class      | Properties |
| ----------- | ----------- |
| relative   | position: 'relative'        |
| absolute   | position: 'absolute'        |

### Overflow

#### Overflow

| Class      | Properties |
| ----------- | ----------- |
| overflow-visible   | overflow: 'visible'        |
| overflow-hidden   | overflow: 'hidden'        |
| overflow-scroll   | overflow: 'scroll'        |

### Text

#### Text Align

| Class      | Properties |
| ----------- | ----------- |
| text-auto      | textAlign: 'auto'       |
| text-left      | textAlign: 'left'       |
| text-center      | textAlign: 'center'       |
| text-right      | textAlign: 'right'       |
| text-justify      | textAlign: 'justify'       |


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
