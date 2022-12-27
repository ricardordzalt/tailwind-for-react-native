import React from 'react';
import {Button, Text, View} from 'react-native';
import {TWRNProvider, useTW, styled} from '../src';

const Title = styled(Text)`
  font-size-${({fontSize}) => fontSize}
  bg-color-red color-${({color}) => color}
  mt-hp(2) mb-hp(2)
`;

const SubTitle = styled(Text)`
  font-size-30  color-#d36684 dark:color-white
`;

const App = () => {
  const {tw, mode, toggleMode, colors} = useTW();
  return (
    <View
      style={tw(
        'flex-1 bg-white dark:bg-navyBlue justify-center items-center android:padding-40',
      )}>
      <Text style={tw('big-font-size dark:text-#dcdcdc')}>MODE {mode}</Text>
      <Title fontSize={50} color="#7878dd">
        Title
      </Title>
      <SubTitle>Subtitle</SubTitle>
      <Button
        title="Toggle mode"
        onPress={toggleMode}
        color={mode === 'dark' ? 'white' : colors?.navyBlue}
      />
    </View>
  );
};

const AppWrapper = () => {
  return (
    <TWRNProvider
      theme={{
        colors: {
          navyBlue: '#4232dd',
        },
        styles: {
          'big-font-size': {
            fontSize: 50,
          },
        },
        mode: 'dark',
      }}>
      <App />
    </TWRNProvider>
  );
};

export default AppWrapper;
