import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {TWRNProvider, useTW, styled} from '../src';

const Title = styled(Text)`
  font-size-${({fontSize}) => fontSize}
  bg-color-red color-${({color}) => color}
  mt-hp(2) mb-hp(2)
`;

const SubTitle = styled(Text)`
  font-size-30  color-#d36684 dark:color-white
`;

const CustomButton = styled(Pressable)`
  buttons.base
  buttons.primary
  dark:buttons.customs.alternativeBlue
  mt-hp(3)
`;

const ButtonTitle = styled(Text)`
  font-size-20
  color-white
`;

const App = () => {
  const {tw, mode, toggleMode, colors} = useTW();
  return (
    <View
      style={tw(
        'flex-1 bg-white dark:bg-primaryColor.lighten.10% justify-center items-center android:padding-40',
      )}>
      <Text style={tw('big-font-size dark:text-#dcdcdc')}>MODE {mode}</Text>
      <Title fontSize={50} color="#7878dd">
        Title
      </Title>
      <SubTitle>Subtitle</SubTitle>
      <CustomButton
        onPress={toggleMode}
        color={mode === 'dark' ? 'red' : colors?.primaryColor?.base}>
        <ButtonTitle>Toggle mode</ButtonTitle>
      </CustomButton>
    </View>
  );
};

const AppWrapper = () => {
  return (
    <TWRNProvider
      theme={{
        colors: {
          primaryColor: {
            base: '#3737E2',
            lighten: {
              '10%': '#4b4be5',
              '20%': '#5f5fe8',
              '30%': '#7373eb',
              '40%': '#8787ee',
              '50%': '#9b9bf0',
              '60%': '#afaff3',
              '70%': '#c3c3f6',
              '80%': '#d7d7f9',
              '90%': '#ebebfc',
              '100%': '#FFFFFF',
            },
            darken: {
              '10%': '#2020dd',
              '20%': '#1c1cc4',
              '30%': '#1919ac',
              '40%': '#151593',
              '50%': '#12127b',
              '60%': '#0e0e62',
              '70%': '#0b0b4a',
              '80%': '#070731',
              '90%': '#040418',
              '100%': '#000000',
            },
            transparency: {
              '80%': 'rgba(55, 55, 226, 0.8)',
              '8%': 'rgba(135, 135, 238, 0.08)',
            },
          },
          secondaryColor: {
            base: '#17152B',
            lighten: {
              '20%': '#454455',
              '40%': '#747380',
              '60%': '#A2A1AA',
              '80%': '#D1D0D5',
            },
            darken: {
              '20%': '#121122',
              '40%': '#0E0D1A',
              '60%': '#090811',
              '80%': '#050409',
            },
          },
          additionalColor: {
            base: '#E76A4F',
            lighten: {
              '20%': '#EC8872',
              '40%': '#F1A695',
              '60%': '#F5C3B9',
              '80%': '#FAE1DC',
            },
            darken: {
              '20%': '#DA3F1E',
              '40%': '#A42F16',
              '60%': '#6D200F',
              '80%': '#371007',
            },
          },
          midContrastColor: {
            base: '#747380',
            lighten: {
              '20%': '#908F99',
              '40%': '#ACABB3',
              '60%': '#C7C7CC',
              '80%': '#E3E3E6',
            },
            darken: {
              '20%': '#5D5C66',
              '40%': '#46454D',
              '60%': '#2E2E33',
              '80%': '#17171A',
            },
          },
          lowContrastColor: {
            base: '#E0E0E2',
            lighten: {
              '20%': '#E6E6E8',
              '40%': '#ECECEE',
              '60%': '#F3F3F3',
              '80%': '#F9F9F9',
            },
            darken: {
              '20%': '#B2B2B7',
              '40%': '#83838B',
              '60%': '#57575D',
              '80%': '#2B2B2E',
            },
          },
        },
        styles: {
          'big-font-size': {
            fontSize: 50,
          },
          buttons: {
            base: {
              borderRadius: 10,
              padding: 10,
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            },
            primary: {
              backgroundColor: '#55a',
            },
            customs: {
              alternativeBlue: {
                backgroundColor: '#88d',
              },
            },
          },
        },
        mode: 'dark',
      }}>
      <App />
    </TWRNProvider>
  );
};

export default AppWrapper;
