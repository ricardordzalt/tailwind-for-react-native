# Get started

### Installation

Install this library with npm:

    npm i tailwind-for-react-native

or using yarn:

    yarn add tailwind-for-react-native

### Usage

#### The styled function

Using the styled function with tagged template literals allow you to customize components 
with the clases of tailwind-for-react-native (See Available Properties section).


```js
import { styled } from 'tailwind-for-react-native';

const App = () => {
  const [MainView, BlueButton, TextButton] = useStyler([
    [View, 'bg-#c22 flex-1 justify-center items-center'],
    [Pressable, 'rounded-hp(3) w-wp(60) h-wp(20) bg-#22c items-center justify-center',],
    [Text, 'text-white font-bold font-size-hp(1.7) text-center'],
  ]);

  return (
    <MainView>
      <BlueButton>
        <TextButton>I'm a styled pressable button</TextButton>
      </BlueButton>
    </MainView>
  );
}

```

![Example](https://github.com/ricardordzalt/rnstyler/blob/master/assets/example.png?raw=true)

### Theme

Import ThemeProvider wrapper and define some options by passing an object to theme prop.

```js
import {ThemeProvider} from 'rn-styler';

...

<ThemeProvider
    theme={options}
  >
    <App />
  </ThemeProvider>

```
* See how to configure your theme options here below

#### Options

##### Colors

Pass an object with the custom colors you will need use along your application:


```js
import {ThemeProvider} from 'rn-styler';

const options = {
    colors: {
        navyBlue: '#000080',
    }
}

...

<ThemeProvider
    theme={options}
  >
    <App />
</ThemeProvider>


```

And use with useStyler hook in your components:

```js
const App = () => {
    const [ViewNavyBlue] = useStyler([
        [View, 'bg-navyBlue',]
    ])

    return (
        <ViewNavyBlue>
            ....
        </ViewNavyBlue>
    )
};
```

##### useColors hook

Use useColors hook to get all colors configured in your ThemeProvider.

```js
import { useColors } from 'rn-styler';

const App = () => {
    const colors = useColors();

    return (
        <CustomText color={colors.navyBlue}>
            ....
        </CustomText>
    )
};
```


##### Custom Properties

Pass an object with the custom properties you will re-use along your application:


```js
import {ThemeProvider} from 'rn-styler';

const options = {
    properties: {
        customShadow: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.00,
          elevation: 24,
        },
        'background-red-fontSize-big-custom-class': {
          backgroundColor: 'red',
          fontSize: 20,
        }
    }
}

...

<ThemeProvider
    theme={options}
  >
    <App />
</ThemeProvider>


```

And use with useStyler hook in your components:

```js
const App = () => {
    const [CustomView] = useStyler([
        [View, 'customShadow background-red-fontSize-big-custom-class']
    ]);

    return (
        <CustomView>
            ....
        </CustomView>
    )
};
```

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
